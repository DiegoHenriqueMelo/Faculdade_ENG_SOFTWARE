export type SaudacaoProps = {
  nome: string;
};

export default function Saudacao({ nome }: SaudacaoProps) {
  return <h2>Olá, {nome}!</h2>;
}
