import LocationDateReserve from "@/components/DateReserve";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="w-full max-w-lg mx-auto flex flex-col items-center space-y-6 text-black p-6 bg-white shadow-lg rounded-lg mt-4 ">
      <div className="text-2xl font-bold text-gray-800">
        {profile.data.name}
      </div>

      <table className="table-auto border-collapse w-full text-left border border-gray-300 bg-gray-50 rounded-lg shadow-md">
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-300">
            <td className="p-3 font-medium">Email</td>
            <td className="p-3">{profile.data.email}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="p-3 font-medium">Tel.</td>
            <td className="p-3">{profile.data.tel}</td>
          </tr>
          <tr>
            <td className="p-3 font-medium">Member Since</td>
            <td className="p-3">{createdAt.toString()}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-xl font-semibold text-gray-800">
        Reserve Event Room
      </div>

      <div className="w-full space-y-3">
        <div className="text-md text-left text-gray-600">Select your dates</div>
        <LocationDateReserve />
      </div>

      <button
        name="Book Venue"
        className="w-full max-w-xs rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-indigo-600 hover:to-sky-600 px-4 py-3 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
      >
        Book Venue
      </button>
    </main>
  );
}
