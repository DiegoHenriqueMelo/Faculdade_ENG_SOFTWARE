export type BotaoProps = {
  prop: () => void; // função sem parâmetros e sem retorno
};

export default function Botao({ prop }: BotaoProps) {
  return <button onClick={prop}>Clique aqui</button>;
}
