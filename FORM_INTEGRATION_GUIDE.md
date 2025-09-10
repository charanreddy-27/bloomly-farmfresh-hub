# 📧 Form Integration Setup Guide

## 🚨 **Current Status**
The contact forms are **NOT CONNECTED** to any backend service. Form submissions are currently just showing fake success messages without actually sending data anywhere.

## 📋 **Forms That Need Backend Integration**

### 1. **Contact Form** (`/src/components/ContactSection.tsx`)
- **Location**: Homepage "Get in Touch" section
- **Fields**: Name, Email, Phone, Company, Type, Message
- **Current Status**: ❌ Fake submission (2-second delay)

### 2. **Careers Form** (`/src/pages/Careers.tsx`)
- **Location**: `/careers` page
- **Fields**: Name, Email, Phone, Position, Experience, CV Upload, Cover Letter
- **Current Status**: ❌ Fake submission (2-second delay)

## 🔧 **Setup Options**

### **Option 1: Formspree (Recommended - Easiest)**

#### **Step 1: Create Formspree Account**
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create two forms:
   - "Contact Form" for general inquiries
   - "Careers Form" for job applications

#### **Step 2: Get Form Endpoints**
After creating forms, you'll get endpoints like:
- Contact: `https://formspree.io/f/xpznvrev`
- Careers: `https://formspree.io/f/xldrkayz`

#### **Step 3: Update Code**
Replace the placeholder endpoints in:

**ContactSection.tsx** (Line 27):
```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ACTUAL_CONTACT_FORM_ID';
```

**Careers.tsx** (Line 40):
```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ACTUAL_CAREERS_FORM_ID';
```

#### **Step 4: Configure Formspree Settings**
- Set email notifications to `operations@bloomly.co.in`
- Enable file uploads for careers form
- Set up auto-reply messages
- Configure spam protection

### **Option 2: Netlify Forms (If hosting on Netlify)**

Add `data-netlify="true"` to form tags:

```jsx
<form onSubmit={handleSubmit} data-netlify="true" name="contact">
```

### **Option 3: EmailJS (Frontend-only solution)**

1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Install: `npm install @emailjs/browser`
3. Configure email templates
4. Update form handlers

### **Option 4: Custom Backend**

Create your own API endpoints:
- Node.js + Express
- Python + FastAPI
- PHP contact form
- Any backend framework

## 📬 **Email Configuration Needed**

### **Current Email Addresses**
- **General Contact**: `operations@bloomly.co.in`
- **Careers**: `careers@bloomly.co.in` (may need to be created)

### **Email Settings Required**
1. **SMTP Configuration** (if using custom backend)
2. **Email Templates** for:
   - New contact form submission notification
   - Auto-reply to contact form submitter
   - New career application notification
   - Auto-reply to career applicant

## 🔒 **Security Considerations**

### **Data Protection**
- Add CAPTCHA/reCAPTCHA for spam prevention
- Validate file uploads (type, size)
- Sanitize input data
- Implement rate limiting

### **File Upload Security** (Careers Form)
- Restrict file types: `.pdf`, `.doc`, `.docx`
- Maximum file size: 10MB
- Virus scanning (recommended)
- Secure file storage

## ⚡ **Quick Implementation Steps**

### **Immediate Setup (5 minutes)**
1. Create Formspree account
2. Create two forms in Formspree dashboard
3. Copy form IDs
4. Replace `YOUR_FORM_ID` and `YOUR_CAREERS_FORM_ID` in code
5. Test submissions

### **Production Setup (30 minutes)**
1. Configure email templates
2. Set up proper email addresses
3. Add spam protection
4. Test thoroughly
5. Monitor submissions

## 📊 **Form Data Flow**

### **Contact Form Submission**
```
User fills form → Frontend validation → POST to Formspree → 
Formspree sends email to operations@bloomly.co.in → 
Auto-reply sent to user → Success message shown
```

### **Careers Form Submission**
```
User fills form + uploads CV → Frontend validation → 
POST to Formspree (with file) → Formspree sends email + 
attachment to careers@bloomly.co.in → Auto-reply sent → 
Success page shown
```

## 🚀 **Testing Checklist**

- [ ] Contact form sends email to correct address
- [ ] Careers form handles file uploads correctly
- [ ] Auto-reply emails are sent
- [ ] Spam protection works
- [ ] Mobile form submission works
- [ ] Form validation prevents empty submissions
- [ ] Success/error messages display correctly

## 💡 **Next Steps**

1. **Choose a form service** (Formspree recommended)
2. **Set up email addresses** if needed
3. **Replace placeholder endpoints** in code
4. **Test thoroughly** before going live
5. **Monitor submissions** regularly

## 📞 **Support**

If you need help setting this up:
- Formspree has excellent documentation
- Consider hiring a developer for custom backend
- Test with real email addresses before launch

---

**⚠️ IMPORTANT**: Until this is set up, the forms will only show fake success messages and **no actual data will be collected or emailed**.
