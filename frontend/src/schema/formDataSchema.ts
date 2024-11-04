import { z } from "zod";

export const formDataSchema = z.object({
  contato: z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    sexo: z.string().optional(),
    cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres"),
    rg: z.string().optional(),
    endereco: z.object({
      rua: z.string().min(1, "Rua é obrigatória"),
      numero: z.string().min(1, "Número é obrigatório"),
      bairro: z.string().min(1, "Bairro é obrigatório"),
      cidade: z.string().min(1, "Cidade é obrigatória"),
      estado: z.string().min(1, "Estado é obrigatório"),
      cep: z.string().length(8, "CEP deve ter 8 caracteres"),
    }),
    telefone: z.string().min(8, "Telefone é obrigatório"),
    fotoPerfil: z.string().optional(),
    dataAniversario: z.string().optional(), 
  }),
  funcionario: z.object({
    status: z.string().min(1, "Status é obrigatório"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    dataAdmissao: z.string().optional(), 
    setor: z.string().min(1, "Setor é obrigatório"),
    salario: z.string().min(1, "Salário é obrigatório"),
  }),
});

export const schemaRegister = z
  .object({
    fullName: z
      .string()
      .min(
        5,
        "O nome completo é obrigatório e deve ter pelo menos 5 caracteres."
      ),
    email: z.string().email("Insira um e-mail válido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem.",
    path: ["confirmPassword"],
  });
