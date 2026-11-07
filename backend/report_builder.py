from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Spacer,Paragraph,Table, SimpleDocTemplate, Image
from reportlab.graphics.shapes import Drawing
from reportlab.lib.units import mm, inch
from reportlab.lib.enums import TA_CENTER

import decimal

def generateSingleCarReport(table_data2,cost,hst,cost_hst,date_range):
    logo_path = "backend/logo_small.png"
    doc =SimpleDocTemplate('report.pdf',pagesize=A4)
    style = getSampleStyleSheet()

    cell_style = style["BodyText"]
    cell_style.wordWrap = "CJK" #force long strings to wrap

    #to get wrapping have to apply paragraphs to each element with the wrapping style
    table_data2 = [[Paragraph(str(cell), cell_style) for cell in row] for row in table_data2]


    centered_style = ParagraphStyle(
        name="Centered",
        parent=style["Normal"],
        alignment=TA_CENTER,  # TA_CENTER equals 1

    )
    centered_style_num = ParagraphStyle(
        name="Centered",
        parent=style["Normal"],
        alignment=TA_CENTER,  # TA_CENTER equals 1
        fontName= 'Helvetica-Bold',
        fontSize= 14
    )

    image = Image(logo_path,width=70*mm,height=40*mm)
    image.hAlign ="CENTER"
    title =Paragraph(f"Single Car Report: {date_range}", style['Title'])
    cost_para_title = Paragraph(f"Total Cost before HST: ",centered_style)
    cost_para = Paragraph(f" ${str(cost)}",centered_style_num)
    hst_para_title = Paragraph(f"Total HST Owed: ",centered_style)
    hst_para = Paragraph(f"${str(hst)}",centered_style_num)
    cost_hst_para_title = Paragraph(f"Total Cost with HST: ",centered_style)
    cost_hst_para =Paragraph(f"${str(cost_hst)}",centered_style_num)



    sales_data = {
        'Alpha' : [100,120,140,120],
        'Beta': [70,60,60,50],
        'Gamma' : [200,200,200,340]
    }
    table_data = [
        ['Product', 'Q1','Q2','Q3','Q4'],
        ['Alpha']+ sales_data['Alpha'],
        ['Alpha']+ sales_data['Beta'],
        ['Alpha']+ sales_data['Gamma']
    ]
    table = Table(table_data2,colWidths=[0.8 * inch, 1 * inch, 1 * inch],style=[
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ('GRID',(0,0),(-1,0),0.5,colors.grey),
        ('BACKGROUND',(0,0),(-1,0),colors.darkgray),
        ('TEXTCOLOR',(0,0),(-1,0),colors.whitesmoke),
        ('FONTNAME',(0,0),(-1,0), 'Helvetica-Bold')
    ])

    doc.build([image,cost_para_title,cost_para,hst_para_title,hst_para,cost_hst_para_title,cost_hst_para,title,Spacer(0,12),table])

def generateFullReport(table_data2,cost,hst,cost_hst):
    logo_path = "backend/logo_small.png"
    doc =SimpleDocTemplate('report.pdf',pagesize=A4)
    style = getSampleStyleSheet()

    cell_style = style["BodyText"]
    cell_style.wordWrap = "CJK" #force long strings to wrap

    #to get wrapping have to apply paragraphs to each element with the wrapping style
    table_data2 = [[Paragraph(str(cell), cell_style) for cell in row] for row in table_data2]


    centered_style = ParagraphStyle(
        name="Centered",
        parent=style["Normal"],
        alignment=TA_CENTER,  # TA_CENTER equals 1

    )
    centered_style_num = ParagraphStyle(
        name="Centered",
        parent=style["Normal"],
        alignment=TA_CENTER,  # TA_CENTER equals 1
        fontName= 'Helvetica-Bold',
        fontSize= 14
    )

    image = Image(logo_path,width=70*mm,height=40*mm)
    image.hAlign ="CENTER"
    title =Paragraph("Single Car Report", style['Title'])
    cost_para_title = Paragraph(f"Total Cost before HST: ",centered_style)
    cost_para = Paragraph(f" ${str(cost)}",centered_style_num)
    hst_para_title = Paragraph(f"Total HST Owed: ",centered_style)
    hst_para = Paragraph(f"${str(hst)}",centered_style_num)
    cost_hst_para_title = Paragraph(f"Total Cost with HST: ",centered_style)
    cost_hst_para =Paragraph(f"${str(cost_hst)}",centered_style_num)



    sales_data = {
        'Alpha' : [100,120,140,120],
        'Beta': [70,60,60,50],
        'Gamma' : [200,200,200,340]
    }
    table_data = [
        ['Product', 'Q1','Q2','Q3','Q4'],
        ['Alpha']+ sales_data['Alpha'],
        ['Alpha']+ sales_data['Beta'],
        ['Alpha']+ sales_data['Gamma']
    ]
    table = Table(table_data2,colWidths=[0.8 * inch, 1 * inch, 1 * inch],style=[
        ('GRID',(0,0),(-1,0),0.5,colors.grey),
        ('BACKGROUND',(0,0),(-1,0),colors.darkgray),
        ('TEXTCOLOR',(0,0),(-1,0),colors.whitesmoke),
        ('FONTNAME',(0,0),(-1,0), 'Helvetica-Bold')
    ])

    doc.build([image,cost_para_title,cost_para,hst_para_title,hst_para,cost_hst_para_title,cost_hst_para,title,Spacer(0,12),table])
