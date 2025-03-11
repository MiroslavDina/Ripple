import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt6.QtWebEngineWidgets import QWebEngineView

class ChatApp(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Chat App")
        self.setGeometry(100, 100, 800, 600)  # Veľkosť okna

        # Vytvorenie WebView
        self.browser = QWebEngineView()
        self.browser.setUrl("https://flask-chat.onrender.com")  # Tvoja URL

        # Nastavenie layoutu
        central_widget = QWidget()
        layout = QVBoxLayout()
        layout.addWidget(self.browser)
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

# Spustenie aplikácie
app = QApplication(sys.argv)
window = ChatApp()
window.show()
sys.exit(app.exec())
