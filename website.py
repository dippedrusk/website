import flask

app = flask.Flask(__name__)
app.config.update(
    SEND_FILE_MAX_AGE_DEFAULT=31557601, # 1 year 1 second because prime
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Strict',
)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/contact')
def contact():
    return flask.render_template('contact.html')

@app.route('/music')
def music():
    content = flask.render_template('music.html')
    response = flask.make_response(content)
    # TODO: dedupe - currently here, in birding, and in after-request, therefore, error-prone
    response.headers['Content-Security-Policy'] = (
            "default-src 'self' https://www.youtube-nocookie.com https://w.soundcloud.com/ data: "
            "'unsafe-inline'; script-src 'unsafe-inline' https://stackpath.bootstrapcdn.com "
            "https://code.jquery.com/; media-src *; style-src https://stackpath.bootstrapcdn.com "
            "'unsafe-inline';")
    return response

@app.route('/recognition')
def recognition():
    return flask.render_template('recognition.html')

@app.route('/service')
def service():
    return flask.render_template('service.html')

@app.route('/work')
def work():
    return flask.render_template('work.html')

@app.route('/writing')
def writing():
    return flask.render_template('writing.html')

@app.route('/birding')
def birding():
    content = flask.render_template('birding.html')
    response = flask.make_response(content)
    response.headers['Content-Security-Policy'] = (
            "default-src 'self' https://live.staticflickr.com https://embedr.flickr.com/ data: "
            "'unsafe-inline'; script-src 'unsafe-inline' https://stackpath.bootstrapcdn.com "
            "https://code.jquery.com/ http://embedr.flickr.com/ https://widgets.flickr.com/; "
            "media-src *; style-src https://stackpath.bootstrapcdn.com 'unsafe-inline';")
    return response

@app.route('/cv')
def curriculum_vitae():
    return flask.render_template('cv.html')

@app.errorhandler(404)
def page_not_found(_):
    return flask.render_template('404.html'), 404

# Is there a cleaner way of handling these redirects?

@app.route('/index.html')
def index_old():
    return flask.redirect(flask.url_for('index'))

@app.route('/birding.html')
def birding_old():
    return flask.redirect(flask.url_for('birding'))

@app.route('/music.html')
def music_old():
    return flask.redirect(flask.url_for('music'))

@app.route('/cv.html')
def cv_old():
    return flask.redirect(flask.url_for('cv'))

@app.route('/service.html')
def service_old():
    return flask.redirect(flask.url_for('service'))

@app.route('/work.html')
def work_old():
    return flask.redirect(flask.url_for('work'))

@app.route('/recognition.html')
def recognition_old():
    return flask.redirect(flask.url_for('recognition'))

@app.route('/contact.html')
def contact_old():
    return flask.redirect(flask.url_for('contact'))

@app.after_request
def add_header(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31557601; includeSubDomains'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    if 'Content-Security-Policy' not in response.headers:
        # TODO: the "data: 'unsafe-inline'" part is bad and vulnerable to XSS and you should try to
        # get rid of bootstrap's CSS ASAP, and you should feel bad until you do
        # https://security.stackexchange.com/questions/94993/is-including-the-data-scheme-in-your-content-security-policy-safe
        # https://research.securitum.com/do-you-allow-to-load-svg-files-you-have-xss/
        response.headers['Content-Security-Policy'] = (
                "default-src 'self' data: 'unsafe-inline'; script-src 'unsafe-inline' "
                "https://stackpath.bootstrapcdn.com https://code.jquery.com/; media-src *; "
                "style-src https://stackpath.bootstrapcdn.com 'unsafe-inline';")
    return response

if __name__ == '__main__':
    app.run()
