# Admin CRUD Pages Summary - Updated to Match Database Schema

This document provides an overview of all the CRUD pages created for the admin panel, now matching the exact database schema.

## Pages Created/Updated

### 1. **Users Management** (`/users`)
- **File**: `src/pages/Users.tsx`
- **API Endpoint**: `/users`
- **Admin Required**: Yes
- **Schema**:
  - name (string, required)
  - email (string, required)
  - password (string, required)
  - firebaseUid (string, required)
  - role (string)
  - verified (boolean)

### 2. **Books Management** (`/books`)
- **File**: `src/pages/Books.tsx`
- **API Endpoint**: `/books`
- **Admin Required**: Yes
- **Schema**:
  - title (string, required)
  - description (string)
  - price (string)
  - image (file)
  - tableOfContents (array)
  - link (string)
  - priority (number)

### 3. **Courses Management** (`/course`)
- **File**: `src/pages/Course.tsx`
- **API Endpoint**: `/courses`
- **Admin Required**: Yes
- **Schema**:
  - title (string, required)
  - description (string, required)
  - thumbnail (file, required)
  - instructor (string, required)
  - duration (string, required)
  - level (string, required)
  - lessons (string, required)
  - badge (string)
  - link (string)
  - priority (number)

### 4. **Research Projects Management** (`/research`)
- **File**: `src/pages/ResearchProjects.tsx`
- **API Endpoint**: `/research-projects`
- **Admin Required**: Yes
- **Schema**:
  - title (string, required)
  - amount (string, required)
  - fundingAgency (string, required)
  - scheme (string, required)
  - duration (string, required)
  - investigators (string, required)
  - discription (string, required) *Note: typo preserved from DB*
  - link (string)

### 5. **Podcasts Management** (`/podcast`)
- **File**: `src/pages/Podcast.tsx`
- **API Endpoint**: `/podcasts`
- **Admin Required**: Yes
- **Schema**:
  - topic (string, required)
  - place (string, required)
  - date (string, required)

### 6. **Admin Positions Management** (`/admin-positions`)
- **File**: `src/pages/AdminPositions.tsx`
- **API Endpoint**: `/positions`
- **Admin Required**: Yes
- **Schema**:
  - description (string, required)

### 7. **Workshops Management** (`/workshops`)
- **File**: `src/pages/Workshops.tsx`
- **API Endpoint**: `/workshops`
- **Admin Required**: Yes
- **Schema**:
  - year (number, required)
  - events (array, required)

### 8. **Journals Management** (`/journals`)
- **File**: `src/pages/Journals.tsx`
- **API Endpoint**: `/journals`
- **Admin Required**: Yes
- **Schema**:
  - authors (string, required)
  - title (string, required)
  - journal (string, required)
  - year (string, required)
  - volume (string)
  - number (string)
  - pages (string, required)

### 9. **Chapters Management** (`/chapters`)
- **File**: `src/pages/Chapters.tsx`
- **API Endpoint**: `/chapters`
- **Admin Required**: Yes
- **Schema**:
  - chapter (string, required)
  - book (string, required)
  - type (string, required)
  - file (file, required)

### 10. **Subscribers Management** (`/subscribers`)
- **File**: `src/pages/Subscribers.tsx`
- **API Endpoint**: `/subscribe`
- **Admin Required**: No
- **Schema**:
  - email (string, required)

### 11. **Testimonials Management** (`/testimonials`)
- **File**: `src/pages/Testimonials.tsx`
- **API Endpoint**: `/testimonials`
- **Admin Required**: No
- **Schema**:
  - name (string, required)
  - role (string, required)
  - image (file)
  - quote (string, required)

### 12. **Students Management** (`/students`)
- **File**: `src/pages/Students.tsx`
- **API Endpoint**: `/students`
- **Admin Required**: Yes
- **Schema**:
  - name (string, required)
  - thesisTitle (string, required)
  - degree (string, required)
  - year (string, required)
  - image (file)

### 13. **Poems & Songs Management** (`/poems`)
- **File**: `src/pages/Poems.tsx`
- **API Endpoint**: `/poems`
- **Admin Required**: No
- **Schema**:
  - title (string, required)
  - content (string, required)
  - youtubeLink (string, required)

### 14. **Articles Management** (`/articles`)
- **File**: `src/pages/Articles.tsx`
- **API Endpoint**: `/articles`
- **Admin Required**: No
- **Schema**:
  - year (number, required)
  - authors (string, required)
  - title (string, required)
  - publication (string, required)
  - monthYear (string, required)

### 15. **Conferences Management** (`/conferences`)
- **File**: `src/pages/Conferences.tsx`
- **API Endpoint**: `/conferences`
- **Admin Required**: No
- **Schema**:
  - year (number, required)
  - authors (string, required)
  - title (string, required)
  - venue (string)
  - location (string)
  - details (string)

### 16. **Publications Management** (`/publications`)
- **File**: `src/pages/Publications.tsx`
- **API Endpoint**: `/publications`
- **Admin Required**: No
- **Schema**:
  - year (number, required)
  - authors (string, required)
  - title (string, required)
  - journal (string, required)
  - volume (string)
  - issue (string)
  - pages (string)
  - file (file)

### 17. **Contact Management** (`/contact`)
- **File**: `src/pages/Contact.tsx`
- **API Endpoint**: `/contact`
- **Admin Required**: No
- **Schema**:
  - name (string, required)
  - email (string, required)
  - message (string, required)
  - fileUrl (file)

## Navigation Links Added

All pages have been added to the navigation with appropriate icons:
- Users (Users icon)
- Books (BookOpen icon)
- Course (GraduationCap icon)
- Research (FlaskConical icon)
- Podcast (Mic2 icon)
- Admin Positions (Landmark icon)
- Workshops (Presentation icon)
- Journals (LibraryBig icon)
- Chapters (BookMarked icon)
- Subscribers (UserCheck icon)
- Testimonials (MessageSquareQuote icon)
- Students (School icon)
- Poems & Songs (Music icon)
- Articles (FileText icon) - NEW
- Conferences (Calendar icon) - NEW
- Publications (Newspaper icon) - NEW
- Contact (Mail icon) - NEW

## Key Features

1. **Consistent Token Management**: All pages now use `localStorage.getItem("token") ?? ""` instead of hardcoded tokens
2. **File Upload Support**: Pages support single and multiple file uploads as per API requirements
3. **Array Field Support**: Complex fields like tags, authors, speakers are handled as arrays
4. **Proper Field Types**: Number, string, boolean, file, and array types are properly configured
5. **Required Field Validation**: Required fields are marked and validated by the GenericCrud component
6. **Responsive Design**: All pages use the same GenericCrud component with consistent styling

## API Compatibility

All pages are designed to work with the backend API endpoints as documented, including:
- Proper HTTP methods (GET, POST, PATCH, DELETE)
- File upload handling with multipart/form-data
- Authentication headers with Bearer tokens
- Admin role requirements where specified

## Usage

Each page provides full CRUD functionality:
- **Create**: Add new entries with form validation
- **Read**: View all entries with pagination and search
- **Update**: Edit existing entries with file replacement support
- **Delete**: Remove entries with confirmation dialogs

The GenericCrud component handles all the common functionality, making the pages maintainable and consistent.