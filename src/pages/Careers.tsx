import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, Users, Briefcase, TrendingUp, X } from 'lucide-react';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!cvFile) {
      newErrors.cv = 'CV/Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 10MB. Please choose a smaller file.');
        return;
      }

      // Check file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
      
      if (allowedTypes.includes(file.type) || hasValidExtension) {
        setCvFile(file);
        // Clear CV error when file is selected
        if (errors.cv) {
          setErrors(prev => ({
            ...prev,
            cv: ''
          }));
        }
      } else {
        alert('Please upload a PDF, DOC, or DOCX file only.');
        // Reset the file input
        e.target.value = '';
      }
    }
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    // Reset the file input
    const fileInput = document.getElementById('cv') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log('Submitting form with data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        cvFileName: cvFile?.name,
        cvFileSize: cvFile?.size
      });

      // TODO: Replace with your actual Formspree endpoint for careers
      // Get your form endpoint from https://formspree.io/
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvgblvpr';
      
      // Try submitting without file first, then handle file separately
      const basicData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position || 'Not specified',
        experience: formData.experience || 'Not specified',
        cover_letter: formData.coverLetter || 'No cover letter provided',
        cv_filename: cvFile ? cvFile.name : 'No file uploaded',
        cv_filesize: cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB` : 'N/A',
        _replyto: formData.email,
        _subject: `Career Application from ${formData.name}${formData.position ? ` - ${formData.position}` : ''}`,
        message: `Career application submitted with the following details:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPosition: ${formData.position || 'Not specified'}\nExperience: ${formData.experience || 'Not specified'}\nCV File: ${cvFile ? cvFile.name : 'No file uploaded'}\n\nCover Letter:\n${formData.coverLetter || 'No cover letter provided'}`
      };

      console.log('Submitting to Formspree endpoint:', FORMSPREE_ENDPOINT);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(basicData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          coverLetter: ''
        });
        setCvFile(null);
        setErrors({}); // Clear all errors after successful submission
        // Reset the file input
        const fileInput = document.getElementById('cv') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        // If there was a file, show additional message
        if (cvFile) {
          alert('Application submitted successfully! Note: Due to technical limitations, please also email your CV directly to operations@bloomly.co.in with the subject "CV - ' + formData.name + '"');
        }
      } else {
        const errorText = await response.text();
        console.error('Form submission failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        
        // Try to parse error response for more details
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Parsed error:', errorJson);
        } catch (e) {
          console.error('Could not parse error response as JSON');
        }
        
        throw new Error(`Form submission failed: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      let errorMessage = 'There was an error submitting your application. ';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage += 'Please check your internet connection and try again.';
        } else if (error.message.includes('413')) {
          errorMessage += 'The file you uploaded is too large. Please try a smaller file.';
        } else if (error.message.includes('400')) {
          errorMessage += 'There was an issue with the form data. Please check all fields and try again.';
        } else {
          errorMessage += 'Please try again or email us directly at operations@bloomly.co.in';
        }
      } else {
        errorMessage += 'Please try again or email us directly at operations@bloomly.co.in';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const positions = [
    'Software Engineer',
    'Product Manager',
    'Data Analyst',
    'Supply Chain Manager',
    'Quality Assurance',
    'Business Development',
    'Operations Manager',
    'Customer Support',
    'Marketing Specialist',
    'Finance Manager',
    'Other'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h1>
                <p className="text-gray-600 mb-4">
                  Thank you for your interest in joining Bloomly. We'll review your application and get back to you soon.
                </p>
                <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <strong>Important:</strong> If you uploaded a CV, please also email it directly to 
                  <a href="mailto:operations@bloomly.co.in" className="underline ml-1">operations@bloomly.co.in</a> 
                  to ensure we receive it properly.
                </p>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Help us revolutionize the farm-to-table supply chain and build a sustainable future for agriculture
            </p>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Apply Now</h2>
                <p className="text-gray-600">
                  Ready to join our mission? Fill out the form below and we'll get back to you soon.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Career Application</CardTitle>
                  <CardDescription>
                    Please provide your details and upload your CV to apply for a position at Bloomly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                          className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                          className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your phone number"
                          className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="position">Position of Interest</Label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select a position</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years</option>
                        <option value="2-3">2-3 years</option>
                        <option value="4-5">4-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <Label htmlFor="cv">Upload CV/Resume *</Label>
                      <div className="mt-1">
                        {cvFile ? (
                          // Show uploaded file with remove option
                          <div className="flex items-center justify-between p-4 border-2 border-green-300 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                              <span className="text-sm font-medium text-green-800">{cvFile.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                              title="Remove file"
                            >
                              <X className="w-4 h-4 mr-1" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        ) : (
                          // Show upload area
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="cv"
                              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                                errors.cv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className={`w-8 h-8 mb-4 ${errors.cv ? 'text-red-500' : 'text-gray-500'}`} />
                                <p className={`mb-2 text-sm ${errors.cv ? 'text-red-500' : 'text-gray-500'}`}>
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className={`text-xs ${errors.cv ? 'text-red-500' : 'text-gray-500'}`}>PDF, DOC, or DOCX (MAX. 10MB)</p>
                              </div>
                              <input
                                id="cv"
                                name="cv"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                required
                              />
                            </label>
                          </div>
                        )}
                        {errors.cv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cv}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          <strong>Note:</strong> If you experience issues with file upload, you can submit the form and 
                          email your CV separately to operations@bloomly.co.in
                        </p>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you'd like to join Bloomly and what makes you a great fit for this role..."
                        rows={4}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
