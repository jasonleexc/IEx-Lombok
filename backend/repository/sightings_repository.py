from api import db

def addSightingToDB(sighting):
    try:
        db.session.add(sighting)
        db.session.commit()
        return sighting
    except Exception as e:
        db.session.rollback()
        raise e
    
def deleteSightingFromDB(sighting):
    try:
        db.session.delete(sighting)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e