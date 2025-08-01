import { getDB, ObjectId } from '../database.js';

export class CityService {
  constructor() {
    this.collectionName = 'cities';
  }

  getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async getAllCities() {
    try {
      const collection = this.getCollection();
      const cities = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return cities;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw new Error('Failed to fetch cities');
    }
  }

  async getCityById(id) {
    try {
      const collection = this.getCollection();
      const city = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!city) {
        throw new Error('City not found');
      }
      
      return city;
    } catch (error) {
      console.error('Error fetching city:', error);
      throw new Error('Failed to fetch city');
    }
  }

  async createCity(cityData) {
    try {
      const collection = this.getCollection();
      
      const newCity = {
        ...cityData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(newCity);
      
      return {
        _id: result.insertedId,
        ...newCity
      };
    } catch (error) {
      console.error('Error creating city:', error);
      throw new Error('Failed to create city');
    }
  }

  async deleteCity(id) {
    try {
      const collection = this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        throw new Error('City not found');
      }
      
      return { success: true, deletedCount: result.deletedCount };
    } catch (error) {
      console.error('Error deleting city:', error);
      throw new Error('Failed to delete city');
    }
  }

  async updateCity(id, updateData) {
    try {
      const collection = this.getCollection();
      
      const updatedCity = {
        ...updateData,
        updatedAt: new Date()
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedCity }
      );
      
      if (result.matchedCount === 0) {
        throw new Error('City not found');
      }
      
      return await this.getCityById(id);
    } catch (error) {
      console.error('Error updating city:', error);
      throw new Error('Failed to update city');
    }
  }
}

export default new CityService();