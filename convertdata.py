import csv
reader = csv.reader(open('movies.csv', 'r'), delimiter=",")
num_rows = sum(1 for line in open("movies.csv"))
f = open('data.js', 'w')
f.write("var data = [\n")
rows_so_far = 0
header_line = reader.next()
for row in reader:
	rows_so_far += 1
	f.write('\t{\n')
	f.write('\t\tid: ' + '"' + row[0] + '",\n')
	f.write('\t\timdb_id: ' + '"' + row[1] + '",\n')
	f.write('\t\tmtitle: ' + '"' + row[5] + '",\n')
	f.write('\t\tmy_rating: ' + '"' + row[8] + '",\n')
	f.write('\t\timdb_rating: ' + '"' + row[9] + '",\n')
	f.write('\t\tyear: ' + '"' + row[11] + '",\n')
	f.write('\t\trelease_date: ' + '"' + row[14] + '"')

	if rows_so_far < num_rows-1:
		f.write("\n\t},\n")
	else:
		f.write("\n\t}\n")

f.write('];')
f.close()