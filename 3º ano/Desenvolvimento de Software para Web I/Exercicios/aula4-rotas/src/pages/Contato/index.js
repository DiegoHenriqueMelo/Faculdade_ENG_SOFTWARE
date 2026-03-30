function Contato() {
  return (
    <div style={{ display: "flex", gap: "24px", padding: "16px" }}>
      <iframe
        title="Fatec Franca no Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.3!2d-47.407!3d-20.537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a3b5b5b5b5b5%3A0x0!2sFatec+Franca!5e0!3m2!1spt-BR!2sbr!4v1234567890"
        width="450"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div>
        <h2>Faculdade de Tecnologia de Franca • Fatec Franca</h2>
        <br />
        <p>CNPJ/MF: 62.823.257/0109-10</p>
        <p>Rua Irênio Grecco nº 4580</p>
        <p>Vila Imperador</p>
        <p>Franca/SP</p>
        <p>14405-191</p>
        <p>Telefone: (16) 3702-3204</p>
        <p>Fax: (16) 3702-2854</p>
        <br />
        <p>
          <strong>E-mail:</strong> secretaria@fatecfranca.edu.br
        </p>
        <br />
        <p>
          <strong>Linhas de ônibus urbano</strong>
        </p>
        <ul style={{ marginLeft: "20px" }}>
          <li>J08 (Vl. Imperador) – ponto na R. Irênio Grecco</li>
          <li>C01 (Circular 01), C02 (Circular 02) e LDN (Linha Direta Norte) – ponto na Av. Orlando Dompieri</li>
          <li>J09 (Vl. Imperador via Jd. Planalto) – ponto na R. Realindo Jacinto Mendonça</li>
        </ul>
        <br />
        <small>Fonte: Empresa São José</small>
      </div>
    </div>
  );
}

export default Contato;
