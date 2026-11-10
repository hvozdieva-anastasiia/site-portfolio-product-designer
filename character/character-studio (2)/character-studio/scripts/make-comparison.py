from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
root=Path(__file__).resolve().parents[1]
work=root.parents[1]/'work/tracing'
canvas=Image.new('RGB',(1580,660),'#f3f0eb')
draw=ImageDraw.Draw(canvas)
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',22)
small=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',15)
items=[('Утверждённый референс',root/'assets/reference-approved.png'),('Было: первая версия',work/'v1.png'),('Стало: трассировка',root/'assets/character-v2.png')]
for i,(title,file) in enumerate(items):
    x=20+i*520
    draw.rounded_rectangle((x,20,x+500,637),radius=18,fill='#ffffff',outline='#e1dce5',width=1)
    draw.text((x+22,42),title,font=font,fill='#32263b')
    image=Image.open(file).convert('RGBA').resize((488,488),Image.Resampling.LANCZOS)
    canvas.paste(image,(x+6,102),image)
    label=['Исходная геометрия и пропорции','Приблизительные контуры','Контуры взяты с исходного рисунка'][i]
    draw.text((x+22,604),label,font=small,fill='#8c7f95')
canvas.save(root/'comparison-v2.png')
