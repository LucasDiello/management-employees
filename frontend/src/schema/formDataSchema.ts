import { z } from "zod";

export const formDataSchema = z.object({
  contato: z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    sexo: z.enum(["Masculino", "Feminino", "Outros"]).optional(),
    rg: z.string().optional(),
    cpf: z.string().refine((cpf) => isValidCPF(cpf), {
      message: "CPF inválido",
    }),
    endereco: z.object({
      rua: z.string().min(1, "Rua é obrigatória"),
      numero: z.string().min(1, "Número é obrigatório"),
      bairro: z.string().min(1, "Bairro é obrigatório"),
      cidade: z.string().min(1, "Cidade é obrigatória"),
      estado: z.string().min(2, "Estado é obrigatório"),
      cep: z
        .string()
        .regex(/^\d{5}-?\d{3}$/, "CEP inválido (ex: 12345678 ou 12345-678)"),
    }),
    telefone: z
    .string()
    .min(8, "Telefone é obrigatório")
    .regex(/^\(?\d{2}\)?\s?\d{8,9}$/, "Telefone deve estar em um formato válido"),
    dataAniversario: z
      .string()
      .refine((data) => !isNaN(Date.parse(data)), {
        message: "Data de aniversário inválida",
      })
      .optional(),
  }),
  funcionario: z.object({
    status: z.string().min(1, "Status é obrigatório"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    dataAdmissao: z
      .string()
      .refine((data) => !isNaN(Date.parse(data)), {
        message: "Data de admissão inválida",
      })
      .optional(),
    setor: z.string().min(1, "Setor é obrigatório"),
    salario: z.preprocess(
      (value) => parseFloat(value as string),
      z.number().positive("Salário deve ser um número positivo")
    ),
  }),
});

function isValidCPF(cpf: string) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  
  const cpfArray = cpf.split("");
  const validator = cpfArray
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map((el) => +el);

  const toValidate = (pop: number) =>
    cpfArray
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map((el) => +el);

  const rest = (count: number, pop: number) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

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
