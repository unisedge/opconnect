-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADMIN', 'MENTOR', 'GUEST');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('Pending', 'Applied', 'Processing', 'NoResponse', 'Selected', 'Rejected');

-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('OffCampus', 'OnCampus');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "idNumber" TEXT,
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" SERIAL NOT NULL,
    "type" "OpportunityType" NOT NULL,
    "jobTitle" TEXT,
    "link" TEXT,
    "company" TEXT,
    "status" "OpportunityStatus" NOT NULL DEFAULT 'Pending',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ssc" (
    "id" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "academicYear" TEXT,
    "yearOfPass" TEXT NOT NULL,
    "grades" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Ssc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intermediate" (
    "id" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "academicYear" TEXT,
    "yearOfPass" TEXT NOT NULL,
    "grades" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Intermediate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graduation" (
    "id" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "academicYear" TEXT,
    "yearOfPass" TEXT,
    "cgpa" TEXT,
    "certificate" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Graduation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostGraduation" (
    "id" TEXT NOT NULL,
    "collegeName" TEXT,
    "academicYear" TEXT,
    "yearOfPass" TEXT,
    "cgpa" TEXT,
    "certificate" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "PostGraduation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "landmark" TEXT,
    "houseNumber" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "dateOfBirth" TEXT,
    "currentSemester" TEXT,
    "gender" TEXT NOT NULL,
    "academicYear" TEXT,
    "branch" TEXT,
    "course" TEXT,
    "section" TEXT,
    "personalEmail" TEXT,
    "email" TEXT,
    "resume" TEXT,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_idNumber_key" ON "User"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Ssc_certificate_key" ON "Ssc"("certificate");

-- CreateIndex
CREATE UNIQUE INDEX "Ssc_profileId_key" ON "Ssc"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Intermediate_certificate_key" ON "Intermediate"("certificate");

-- CreateIndex
CREATE UNIQUE INDEX "Intermediate_profileId_key" ON "Intermediate"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Graduation_certificate_key" ON "Graduation"("certificate");

-- CreateIndex
CREATE UNIQUE INDEX "Graduation_profileId_key" ON "Graduation"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "PostGraduation_certificate_key" ON "PostGraduation"("certificate");

-- CreateIndex
CREATE UNIQUE INDEX "PostGraduation_profileId_key" ON "PostGraduation"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileId_key" ON "Address"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_rollNumber_key" ON "Profile"("rollNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phone_key" ON "Profile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_personalEmail_key" ON "Profile"("personalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_firstName_lastName_key" ON "Profile"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_firstName_lastName_dateOfBirth_key" ON "Profile"("firstName", "lastName", "dateOfBirth");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ssc" ADD CONSTRAINT "Ssc_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intermediate" ADD CONSTRAINT "Intermediate_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graduation" ADD CONSTRAINT "Graduation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostGraduation" ADD CONSTRAINT "PostGraduation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
