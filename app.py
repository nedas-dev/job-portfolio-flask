from flask import Flask, render_template, url_for, request
from flask_mail import Mail, Message
import os

app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ['EMAIL_USER']
app.config['MAIL_PASSWORD'] = os.environ['EMAIL_PASS']
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = os.environ['EMAIL_USER']

mail = Mail(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/portfolio/')
def projects():
    return render_template('projects.html')


@app.route('/aboutme/')
def about():
    return render_template('about.html')


@app.route('/contact/', methods=['GET', 'POST'])
def contact():
    if request.method == "GET":
        pass
    elif request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        if name and email and message:
            msg = Message('Contact Me Tab', recipients=[
                'nedas.snarskis17@gmail.com'])
            msg.body = f'Person who contacted you: {name},\nEmail address: {email}, \n{message}'
            mail.send(msg)
            return render_template('contact.html', message_type="success", message="Your email was successfully sent!")
        else:
            return render_template('contact.html', message_type="error", message="There was an error sending your email. Please try again!")

    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)
