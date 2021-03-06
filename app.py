from flask import Flask, render_template, url_for, request
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ['EMAIL_USER']
app.config['MAIL_PASSWORD'] = os.environ['EMAIL_PASS']
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = os.environ['EMAIL_USER']
mail = Mail(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return f'{self.id} - total count: {self.count}'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/portfolio/')
def projects():
    try:
        counter = Visit.query.filter_by(id=1).first_or_404()
        counter.count += 1
        db.session.commit()
    except:
        pass

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


@app.route('/visits/')
def visits():
    inst = Visit.query.filter_by(id=1).first_or_404()
    return f'Total visits: {inst.count}'


@app.route('/reset/')
def reset():
    try:
        counter = Visit.query.filter_by(id=1).first_or_404()
        counter.count = 0
        db.session.commit()
    except:
        pass

    inst = Visit.query.filter_by(id=1).first_or_404()
    return f'Total visits: {inst.count}'


if __name__ == '__main__':
    # in terminal say "flask run --host=0.0.0.0" if you want to run it on the network and not localhost (be available for the whole network)
    app.run(debug=True)
