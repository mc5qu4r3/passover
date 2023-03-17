import os, csv, json, pathlib

BARCODE_FIELD_NAME = "Barcode:"
HAMETZ_FIELD_NAME = "חמץ גמור"
HEBREW_FIELD_NAME = "שם מוצר"

class Item:

    def __init__(self, barcode, hebrewName, isHametz):

        self.barcode = barcode
        self.hebrewName = hebrewName
        self.isHametz = isHametz
    
    def toJSON(self):
        return json.dumps(self.__dict__, ensure_ascii=False)

def parseAllItems(csvReader):

    headerLine = next(csvReader)
    isHametzFieldIndex = headerLine.index(HEBREW_FIELD_NAME)
    barcodeFieldIndex = headerLine.index(BARCODE_FIELD_NAME)
    hebrewNameFieldIndex = headerLine.index(HEBREW_FIELD_NAME)

    return [Item(row[barcodeFieldIndex], row[hebrewNameFieldIndex], row[isHametzFieldIndex]) for row in csvReader]

def main():

    # Get all items with barcodes from db file.
    with open("./db/hametz_db.csv", "r") as csvFile:
        csvReader = csv.reader(csvFile)
        itemsWithBarcode = parseAllItems(csvReader)
        csvFile.close()

    # Construct the path to store all DB entries.
    targetDbDir = os.path.join("db", "hametz")

    # Create subdirectory to hold all db records.
    pathlib.Path(targetDbDir).mkdir(parents=True, exist_ok=True)
    
    # Write each item as JSON into DB directory with its barcode as file name.
    for item in itemsWithBarcode:

        with open(os.path.join(targetDbDir, f"{item.barcode}.json"), "w") as fd:
            fd.write(item.toJSON())
            fd.close

if __name__ == "__main__":
    main()