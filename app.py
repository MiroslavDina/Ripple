from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, send
from datetime import datetime
import os 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
socketio = SocketIO(app, cors_allowed_origins="*")

# In-memory storage for messages
messages = []

# Home Route
@app.route("/")
def home():
    return render_template("index.html")

# Route to fetch all messages
@app.route("/messages")
def get_messages():
    return jsonify([{
        "username": msg["username"],
        "message": msg["message"]
    } for msg in messages])

@socketio.on("message")
def handle_message(data):
    username = data["username"]
    message_text = data["message"]
    timestamp = datetime.utcnow()

    # Store message in memory
    messages.append({
        "username": username,
        "message": message_text,
        "timestamp": timestamp
    })

    # Broadcast message to all clients
    send({
        "username": username,
        "message": message_text
    }, broadcast=True)
    
if __name__ == "__main__":
    # socketio.run(app, debug=True)
    # socketio.run(app, host="0.0.0.0", port=5000, debug=True)
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port)