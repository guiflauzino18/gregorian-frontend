export interface UserDTO {
    id?: number,
    nome: string,
    sobrenome: string,
    nascimento: string,
    telefone: string,
    email: string,
    endereco: string,
    login?: string,
    senha?: string,
    role: string,
    status?: string
    alteraNextLogon?: boolean
    dataRegistro?: string
    empresaNome?: string
}