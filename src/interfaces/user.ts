export interface UserDTO {
    id?: number,
    nome: string,
    sobrenome: string,
    nascimento: string,
    telefone: string,
    email: string,
    endereco: string,
    login: string,
    role: string,
    status: number
    alteraNextLogon: boolean
    dataRegistro: string
    empresaNome: string
}