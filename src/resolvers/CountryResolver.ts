import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Country } from "../entities/Country";

@InputType()
class NewCountryInput {
  @Field()
  name!: string;

  @Field()
  code!: string;

  @Field()
  emoji!: string;

  @Field()
  continent!: string;
}

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    const allCountries = await Country.find();
    return allCountries;
  }

  @Query(() => Country, { nullable: true })
  async getCountry(@Arg("code") code: string): Promise<Country> {
    const country = await Country.findOne({ where: { code } });
    if (!country) {
      throw new Error("Country not found");
    }
    return country;
  }

  @Query(() => Country)
  async getContinent(@Arg("continent") continent: string): Promise<Country> {
    const oneContinent = await Country.findOne({ where: { continent } });
    if (!oneContinent) {
      throw new Error("Continent not found");
    }
    return oneContinent;
  }

  @Mutation(() => ID)
  async createCountry(@Arg("data") data: NewCountryInput) {
    const newCountry = Country.create({ ...data });
    await newCountry.save();
    return newCountry.id;
  }
}
