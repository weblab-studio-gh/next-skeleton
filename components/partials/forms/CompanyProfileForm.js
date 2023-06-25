// model CompanyProfile {
//     id           String   @id @default(cuid())
//     name         String
//     address      String
//     city         String
//     state        String
//     zip          String
//     country      String
//     phone        String
//     email        String
//     website      String
//     logo         String
//     description  String
//     vat          String
//     profileId    String
//     profile      Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)

//     @@unique([profileId])

// }
