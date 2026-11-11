# Site surpresa (álbum + QR code)

## Estrutura
```
index.html        estrutura (não precisa mexer)
css/style.css     visual
js/config.js      <- SEUS TEXTOS, FOTOS E LEGENDAS FICAM AQUI
js/app.js         comportamento
fotos/            suas fotos
gerar_qr.py       gera o qr.png
```

## Passo a passo
1. Coloque as fotos em `fotos/` e edite `js/config.js`.
2. Teste local: abra `index.html` no navegador.
3. No GitHub: crie um repositório e suba tudo.
4. `Settings > Pages > Deploy from a branch > main / (root)`.
5. Em ~1 min o site fica em `https://SEUUSUARIO.github.io/NOME-DO-REPO/`.
6. Gere o QR: `pip install qrcode[pil]` e `python gerar_qr.py <URL>` (ou use qualquer gerador de QR online).
7. Imprima, **teste escaneando o papel impresso** (com o celular dela, se der) antes de colar.

## Atenção
- O repositório precisa ser público pro Pages gratuito. O site não aparece no Google (`noindex`), mas **quem tiver o link vê as fotos**. Evite fotos muito íntimas.
- Prefira um nome de repo curto: URL curta = QR mais simples = escaneia melhor.
- Imprima o QR com pelo menos 2,5 cm de lado, preto no branco, sem enfeite por cima.
