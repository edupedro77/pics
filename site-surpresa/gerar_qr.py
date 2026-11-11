"""Gera o QR code do site.
Uso:  pip install qrcode[pil]
      python gerar_qr.py https://SEUUSUARIO.github.io/NOME-DO-REPO/
Cria o arquivo qr.png (alta resolução, pronto pra imprimir).
"""
import sys
import qrcode

if len(sys.argv) < 2:
    sys.exit("Passe a URL do site. Ex.: python gerar_qr.py https://usuario.github.io/surpresa/")

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=24, border=4)
qr.add_data(sys.argv[1])
qr.make(fit=True)
qr.make_image(fill_color="#1B2A6B", back_color="white").save("qr.png")
print("Pronto: qr.png")
