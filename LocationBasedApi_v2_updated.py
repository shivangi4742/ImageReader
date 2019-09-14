def extractTextOnLocation(filename,x1,y1,x2,y2):
	import boto3
	import os
	import sys
	import cv2
	import statistics
	import numpy as np

	client = boto3.client('textract')

	client_textract = boto3.client(
		service_name='textract',
		region_name= 'us-east-1',
		endpoint_url='https://textract.us-east-1.amazonaws.com'
	)
	
	filter_line_list=[]
	new_line_list = []
	final_response=[]
	list_text = []
	list_confidence = []
	final_result = {}
	
    fullPath = C:/Oneture/life/appraisal-letter-april.jpg
	with open(fullPath, 'rb') as file:
		img_test = file.read()
		bytes_test = bytearray(img_test)

	response = client_textract.detect_document_text(Document={'Bytes':bytes_test})

	for i in range(len(response['Blocks'])):
		if(response['Blocks'][i]['BlockType'] == 'LINE' and response['Blocks'][i]['Confidence']>75.0):
			filter_line_list.append(response['Blocks'][i])

	remove_items = ('BlockType', 'Relationships', 'Id')
	for elem in range(len(filter_line_list)):
		for item in remove_items:
			filter_line_list[elem].pop(item, None)
	for j in range(len(filter_line_list)):
		new_line_list.append({'Text' : filter_line_list[j]['Text'], 'Polygon' : filter_line_list[j]['Geometry']['Polygon'], 'Confidence' : filter_line_list[j]['Confidence']})

	img = cv2.imread(fullPath,cv2.IMREAD_COLOR)
	height, width = img.shape[:2]
	X1, Y1 = x1/width, y1/height
	X2, Y2 = x2/width, y2/height

	for i in range(0, len(new_line_list)):
		if(X1<=new_line_list[i]['Polygon'][0]['X'] and Y1<=new_line_list[i]['Polygon'][0]['Y'] and 
			X2>=new_line_list[i]['Polygon'][2]['X'] and Y2>=new_line_list[i]['Polygon'][2]['Y']):
			final_response.extend((new_line_list[i]['Text'], new_line_list[i]['Confidence']))

	for p in range(len(final_response)):
		if(p == int(p/2)*2):
			list_text.append(final_response[p])
		else:
			list_confidence.append(final_response[p])

	final_result['Text'] = " ".join(list_text)
	final_result['Confidence'] = statistics.mean(list_confidence)
	return final_result



def extractTextOnLocation('appraisal-letter-april.jpg', 1,347,540,640):