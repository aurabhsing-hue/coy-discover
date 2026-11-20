const profileData = [
  ["Aarav", 22, "Coffee, music and long drives.", "Delhi", ["Music", "Travel", "Movies"], true],
  ["Ananya", 21, "Book lover and weekend explorer.", "Delhi University", ["Books", "Travel", "Art"], false],
  ["Rohan", 23, "Fitness enthusiast and foodie.", "Noida", ["Fitness", "Food", "Cricket"], true],
  ["Priya", 22, "Finding beauty in little things.", "Delhi", ["Photography", "Music", "Nature"], false],
  ["Kabir", 24, "Tech geek with a creative side.", "Gurgaon", ["Technology", "Gaming", "Movies"], false],
  ["Isha", 21, "Dancing is my happy place.", "Delhi", ["Dance", "Music", "Travel"], true],
  ["Arjun", 23, "Always ready for an adventure.", "Noida", ["Adventure", "Fitness", "Travel"], false],
  ["Meera", 22, "Artist by heart.", "Delhi University", ["Art", "Books", "Coffee"], false],
  ["Dev", 24, "Music is my escape.", "Gurgaon", ["Music", "Gaming", "Food"], true],
  ["Kavya", 21, "Sunsets and good conversations.", "Delhi", ["Nature", "Travel", "Photography"], false],
  ["Aditya", 22, "Building things and chasing dreams.", "Noida", ["Technology", "Books", "Fitness"], false],
  ["Sneha", 23, "Foodie with a travel bucket list.", "Delhi", ["Food", "Travel", "Movies"], true],
  ["Vihaan", 21, "Sports and spontaneous plans.", "Gurgaon", ["Cricket", "Fitness", "Music"], false],
  ["Riya", 22, "A little introvert, a lot curious.", "Delhi", ["Books", "Art", "Coffee"], false],
  ["Karan", 24, "Movies, memes and midnight talks.", "Noida", ["Movies", "Gaming", "Food"], true],
  ["Tanya", 21, "Living life one song at a time.", "Delhi", ["Music", "Dance", "Travel"], false],
  ["Neil", 23, "Nature lover and amateur photographer.", "Gurgaon", ["Nature", "Photography", "Travel"], false],
  ["Simran", 22, "Collecting memories, not things.", "Delhi", ["Travel", "Books", "Art"], true],
  ["Rahul", 24, "Gym, coffee, repeat.", "Noida", ["Fitness", "Coffee", "Technology"], false],
  ["Aditi", 21, "Creative mind, curious soul.", "Delhi University", ["Art", "Music", "Movies"], false],
  ["Manav", 23, "Let's talk about everything.", "Gurgaon", ["Books", "Technology", "Food"], true],
  ["Pooja", 22, "Dancing through life.", "Delhi", ["Dance", "Travel", "Music"], false],
  ["Yash", 21, "Adventure is always a good idea.", "Noida", ["Adventure", "Cricket", "Photography"], false],
  ["Naina", 24, "Coffee dates and deep talks.", "Delhi", ["Coffee", "Books", "Nature"], true],
  ["Ishaan", 22, "Developer by day, gamer by night.", "Gurgaon", ["Technology", "Gaming", "Movies"], false],
  ["Diya", 21, "Making ordinary days special.", "Delhi", ["Art", "Food", "Travel"], false],
  ["Varun", 23, "Football and fitness addict.", "Noida", ["Football", "Fitness", "Music"], true],
  ["Misha", 22, "Exploring new places and ideas.", "Delhi", ["Travel", "Photography", "Books"], false],
  ["Aryan", 24, "Good food, better company.", "Gurgaon", ["Food", "Movies", "Cricket"], false],
  ["Tara", 21, "Smiles, sunsets and stories.", "Delhi", ["Nature", "Music", "Art"], true],
];

const profiles = profileData.map((profile, index) => {
  const gender = index % 2 === 0 ? "men" : "women";

  return {
    id: index + 1,
    name: profile[0],
    age: profile[1],
    bio: profile[2],
    city: profile[3],
    interests: profile[4],
    likedCurrentUser: profile[5],
    photo: `https://randomuser.me/api/portraits/${gender}/${index + 1}.jpg`,
  };
});

export default profiles;