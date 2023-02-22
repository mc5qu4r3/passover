import os, csv, json, pathlib

BARCODE_FIELD_NAME = "ברקוד"
INFO_FIELD_NAME = "מוצרים אלו הינם:"
HEBREW_FIELD_NAME = "שם מוצר בעברית"

class Item:

    def __init__(self, barcode, hebrewName, info):

        self.barcode = barcode
        self.hebrewName = hebrewName
        self.info = [infoField.strip() for infoField in info.split("|")]
    
    def toJSON(self):
        #check
        return json.dumps(self.__dict__, ensure_ascii=False)

def isRowHasValidBarcode(barcodeValue):

    return barcodeValue.isnumeric() and barcodeValue != "0"

def getAllItemWithBarcode(csvReader):

    headerLine = next(csvReader)
    infoFieldIndex = headerLine.index(INFO_FIELD_NAME)
    barcodeFieldIndex = headerLine.index(BARCODE_FIELD_NAME)
    hebrewNameFieldIndex = headerLine.index(HEBREW_FIELD_NAME)
    

    return [Item(row[barcodeFieldIndex], row[hebrewNameFieldIndex], row[infoFieldIndex]) for row in csvReader if isRowHasValidBarcode(row[barcodeFieldIndex])]

def main():

    #Get all items with barcodes from db file.
    with open("passover_db.csv", "r") as csvFile:
        csvReader = csv.reader(csvFile)
        itemsWithBarcode = getAllItemWithBarcode(csvReader)
        csvFile.close()
    
    # Create subdirectory to hold all db records.
    pathlib.Path("db").mkdir(parents=True, exist_ok=True)
    
    # Write each item as JSON into DB directory with its barcode as file name.
    for item in itemsWithBarcode:

        with open(os.path.join("db", f"{item.barcode}.json"), "w") as fd:
            fd.write(item.toJSON())
            fd.close

if __name__ == "__main__":
    main()