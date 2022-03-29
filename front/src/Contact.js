import "./style/contact.css";

function Contact() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <form>
        <label id="casec" htmlform="nomc">
          Votre nom (obligatoire)
        </label>
        <input type="text" id="nomc" />
        <br />
        <label id="casec" htmlform="mail">
          Votre e-mail (obligatoire)
        </label>
        <input type="text" id="mail" />
        <br />
        <label id="casec" htmlform="sujet">
          Sujet
        </label>
        <input type="text" id="sujet" />
        <br />
        <label id="casemessage" htmlform="message">
          Message
        </label>
        <input type="text" id="message" />
        <br />
      </form>
    </div>
  );
}

export default Contact;
