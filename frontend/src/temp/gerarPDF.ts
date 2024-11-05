import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../libs/firebaseConfig";
import { FormData } from "../types";

pdfMake.vfs = vfsFonts.pdfMake.vfs;

const gerarPDF = async (formData : FormData, saved = false, id : string ) => {
  const docDefinition: any = {  
    content: [
      {
        text: `Formulário Funcionário:`,
        style: "header",
      },
      {
        text: formData.contato.nome,
        style: "nomeFuncionario",
      },
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              {
                text: "Informações de Contato",
                style: "subheader",
                colSpan: 2,
              },
              {},
            ],
            [{ text: "Nome:", bold: true }, formData.contato.nome],
            [{ text: "Email:", bold: true }, formData.contato.email],
            [{ text: "CPF:", bold: true }, formData.contato.cpf],
            [{ text: "RG:", bold: true }, formData.contato.rg],
            [{ text: "Sexo:", bold: true }, formData.contato.sexo],
            [
              { text: "Endereço:", bold: true },
              `${formData.contato.endereco.rua}, ${formData.contato.endereco.numero}, ${formData.contato.endereco.bairro}, ${formData.contato.endereco.cidade}, ${formData.contato.endereco.estado}, ${formData.contato.endereco.cep}`,
            ],
            [{ text: "Telefone:", bold: true }, formData.contato.telefone],
            [
              { text: "Data de Aniversário:", bold: true },
              formData.contato.dataAniversario,
            ],
            [
              {
                text: "Informações do Funcionário",
                style: "subheader",
                colSpan: 2,
              },
              {},
            ],
            [{ text: "Status:", bold: true }, formData.funcionario.status],
            [{ text: "Cargo:", bold: true }, formData.funcionario.cargo],
            [
              { text: "Data de Admissão:", bold: true },
              formData.funcionario.dataAdmissao,
            ],
            [{ text: "Setor:", bold: true }, formData.funcionario.setor],
            [{ text: "Salário:", bold: true }, formData.funcionario.salario],
          ],
        },
        layout: {
          fillColor: function (rowIndex: number) {
            return rowIndex % 2 === 0 ? "#f9f9f9" : null;
          },
          hLineColor: () => "#dddddd",
          vLineColor: () => "#dddddd",
          paddingLeft: () => 10,
          paddingRight: () => 10,
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 23,
        bold: true,
      },
      nomeFuncionario: {
        fontSize: 10, 
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 18,
        bold: true,
        margin: [0, 15, 0, 5],
      },
      tableHeader: {
        fillColor: "#e0e0e0",
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
    defaultStyle: {
      fontSize: 12,
      color: "#333333", 
      lineHeight: 1.5, 
    },
  };
  try {

      const pdfBlob = await new Promise<Blob>((resolve) => {
          pdfMake.createPdf(docDefinition).getBlob((blob) => {
              resolve(blob);
            });
        });
        
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}_${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
        
        const fileName = `formulario_${formattedDate}.pdf`;
        console.log("id in gerarPDF", id)
        const storageRef = ref(
            storage,
            `pdfs/${id}/${fileName}`
        );
        
        if (saved) {
          console.log("entrei")
          pdfMake.createPdf(docDefinition).download("relatorio.pdf");
        }

        uploadBytesResumable(storageRef, pdfBlob);
        
    } catch (error) {
        console.error(error);
    }

};


export default gerarPDF;