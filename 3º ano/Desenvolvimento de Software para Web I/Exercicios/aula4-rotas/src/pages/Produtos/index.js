import { useParams } from "react-router-dom";

function Produto() {
  const { id } = useParams();

  if (id === "playstation") {
    return (
      <div>
        <h1>Console PlayStation 5</h1><br />
        <h2>R$4.445,00</h2><br />
        <h3>à vista no Pix e boleto (1% off)</h3><br />
        <img
          src="https://cdn.awsli.com.br/1919/1919257/arquivos/imagem_2021-12-03_141412.png"
          alt="Console PlayStation 5"
          width="350"
        />
      </div>
    );
  }

  if (id === "xbox") {
    return (
      <div>
        <h1>Console Microsoft Xbox Series X, 1TB, Preto</h1><br />
        <h2>R$4.799,99</h2><br />
        <h3>À vista no PIX ou Em até 10x de R$ 479,99 sem juros no cartão</h3><br />
        <img
          src="https://assets.xboxservices.com/assets/cb/f8/cbf83b9d-bf30-4e36-96ad-fef4293ff944.png?n=XBX-CMP-L-Console_Large-D_02.png"
          alt="Console Xbox X"
          width="350"
        />
      </div>
    );
  }

  if (id === "atari") {
    return (
      <div>
        <h1>Atari 2600+ Console</h1><br />
        <h2>R$699,00</h2><br />
        <h3>À vista no Pix (5% off) ou em até 6x no cartão sem juros</h3><br />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Atari-2600-Wood-4Sw-Set.jpg"
          alt="Atari 2600"
          width="350"
        />
      </div>
    );
  }

  if (id === "super-nintendo") {
    return (
      <div>
        <h1>Super Nintendo Entertainment System (SNES)</h1><br />
        <h2>R$899,00</h2><br />
        <h3>À vista no Pix ou em até 8x de R$ 112,37 no cartão sem juros</h3><br />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Super-Nintendo-Console-Set.jpg"
          alt="Super Nintendo"
          width="350"
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Produto não encontrado!</h2>
    </div>
  );
}

export default Produto;
