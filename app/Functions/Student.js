import clientPromise from "@/lib/mongodb";

async function connectStudentDb() {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        return collection;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to connect db');
    }
}

export async function getStudentData(page = 1, ITEMS_PER_PAGE = 10) {
    try {
      const collection = await connectStudentDb(); // Assuming this function establishes the database connection
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const documents = await collection
        .find({})
        .sort({ _id: -1 })
        .skip(skip)
        .limit(ITEMS_PER_PAGE)
        .toArray();
  
      const totalDocuments = await collection.countDocuments();

      return {
        data: documents,
        count: totalDocuments,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch book data');
    }
  }
  