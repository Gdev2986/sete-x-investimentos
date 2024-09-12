import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export type UserData = {
    id: number;
    email?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

export const user ={
    id: 1,
    email: 'teste@teste.com',
    username: 'Gabriel',
    password: 'test',
    firstName: 'Test',
    lastName: 'User',
    role: 'admin',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
} 
export const fakeBankDetails = {
    bankName: 'Banco do Brasil',
    agencyNumber: '1234-5',
    accountNumber: '67890-1',
    pixKey: 'teste@teste.com'
};

var mock = new MockAdapter(axios);

export function configureFakeBackend() {
    let users: UserData[] = [
        {
            id: 1,
            email: 'teste@teste.com',
            username: 'test',
            password: 'test',
            firstName: 'Test',
            lastName: 'User',
            role: 'admin',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
        },
    ];

    mock.onPost('/login/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // find if any user matches login credentials
                let filteredUsers = users.filter((user) => {
                    return user.email === params.email && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return user details and fake jwt token
                    let user = filteredUsers[0];
                    resolve([200, user]);
                } else {
                    // else return error
                    resolve([401, { message: 'Usúario ou senha incorreta' }]);
                }
            }, 1000);
        });
    });

    mock.onPost('/register/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // add new users
                let [firstName, lastName] = params.fullname.split(' ');
                let newUser: UserData = {
                    id: users.length + 1,
                    username: firstName,
                    password: params.password,
                    firstName: firstName,
                    lastName: lastName,
                    role: 'user',
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
                };
                users.push(newUser);

                resolve([200, newUser]);
            }, 1000);
        });
    });

    mock.onPost('/forget-password/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // find if any user matches login credentials
                let filteredUsers = users.filter((user) => {
                    return user.email === params.email;
                });

                if (filteredUsers.length) {
                    // if login details are valid return user details and fake jwt token
                    let responseJson = {
                        message: "Nós enviamos um Link de recuperação no seu e-mail",
                    };
                    resolve([200, responseJson]);
                } else {
                    // else return error
                    resolve([
                        401,
                        {
                            message: "Desculpe, não conseguimos encontrar nenhum usuário registrado com o nome de usuário inserido.",
                        },
                    ]);
                }
            }, 1000);
        });
    });
}
