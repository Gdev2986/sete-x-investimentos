// src/services/rendimentoService.ts
import User from '../models/user';
import Earning from '../models/earnings'; // Ajuste o caminho conforme sua estrutura
import { Op } from 'sequelize';

interface DistribuicaoResultado {
  taxaAplicada: number;
  rendimentoBrutoPercentual: number;
  totalAlocado: number;
}

export async function distribuirRendimentos(): Promise<DistribuicaoResultado> {
  // 1. Obter o último dia útil
  // Aqui é necessário definir a lógica de “último dia útil brasileiro”.
  // Por simplicidade, vamos pegar o último earning registrado.
  // Em produção, você poderia filtrar por data útil, por exemplo:
  // const ultimoDiaUtil = ... lógica para obter a data do último dia útil
  // Aqui, simplificaremos pegando o último registro de earning:
  const ultimoEarning = await Earning.findOne({
    order: [['created_at', 'DESC']]
  });

  if (!ultimoEarning) {
    throw new Error('Nenhum rendimento encontrado.');
  }

  // Rendimento total do último dia útil:
  const rendimentoTotal = ultimoEarning.amount;

  // 2. Obter o total alocado (soma do balance de todos os usuários)
  const usuarios = await User.findAll();
  const totalAlocado = usuarios.reduce((acc, user: any) => acc + Number(user.balance || 0), 0);

  if (totalAlocado === 0) {
    throw new Error('Total alocado é zero, não é possível distribuir.');
  }

  // 3. Calcular o rendimento porcentual bruto
  // rendimentoPorcentual = (rendimentoTotal / totalAlocado) * 100
  const rendimentoPorcentual = (rendimentoTotal / totalAlocado) * 100;

  // 4. Determinar a taxa a aplicar
  let taxaAplicada: number;
  if (rendimentoPorcentual > 3) {
    taxaAplicada = 2; // 2%
  } else if (rendimentoPorcentual >= 1.5) {
    taxaAplicada = 1; // 1%
  } else {
    taxaAplicada = 0.2; // 0.2%
  }

  // 5. Atualizar o saldo dos usuários
  // Para cada usuário, adicionar (taxaAplicada% do balance) ao balance.
  // taxaAplicada é em %, então valorRecebido = (taxaAplicada/100) * user.balance
  const atualizacoes: Promise<any>[] = [];

  for (const user of usuarios) {
    const valorRecebido = (taxaAplicada / 100) * Number(user.balance || 0);
    const novoSaldo = Number(user.balance || 0) + valorRecebido;

    user.balance = novoSaldo;
    atualizacoes.push(user.save());

    // Caso queira salvar histórico, descomente se tiver tabela de histórico:
    // await UserEarningsHistory.create({
    //   user_id: user.id,
    //   earning_id: ultimoEarning.id,
    //   valorRecebido: valorRecebido,
    //   taxaAplicada: taxaAplicada
    // });
  }

  await Promise.all(atualizacoes);

  return {
    taxaAplicada,
    rendimentoBrutoPercentual: rendimentoPorcentual,
    totalAlocado
  };
}
