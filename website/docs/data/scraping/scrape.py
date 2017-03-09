from bs4 import BeautifulSoup, SoupStrainer
import re
import requests
import html as ht
import csv
import yaml


def scrape(url, rex, fnm):
	page = requests.get(url)
	html = str(page.content)
	soup = BeautifulSoup(''.join(html),"lxml")
	searchtext = re.compile(rex,re.IGNORECASE)
	foundtext = soup.find('h2',text=searchtext) # Find the first <p> tag with the search text
	table = foundtext.findNext('table') # Find the first <table> tag that follows it
	rows = table.findAll('tr')
	entries = []
	header = rows[0].findAll('th')
	entry = []
	for th in header:
		txt = th.get_text()
		entry += [ht.unescape(txt)]

	entries.append(entry)

	for tr in rows[1:]:
		cols = tr.findAll('td')
		entry = []
		for td in cols:
			txt = td.get_text()
			entry += [ht.unescape(txt)]

		entries.append(entry)

	with open ('../csv/'+fnm ,'w') as file:
		writer=csv.writer(file, delimiter=',')
		for row in entries:
			writer.writerow(row)


if __name__ == '__main__':

	with open('config.yaml') as file: conf = yaml.load(file)
	for entry in [conf[x] for x in conf]:
		scrape(entry['url'] , entry['rex'] , entry['fnm'])