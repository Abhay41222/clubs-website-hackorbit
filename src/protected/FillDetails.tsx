import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { createUserProfile, checkUserExists } from "../services/supabaseFunctions";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface newErrorsProps {
  name?: string;
  email?: string;
  enrollment?: string;
  branch?: string;
  year?: string;
  gender?: string;
}

export default function FillDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: "",
    enrollment: "",
    branch: "",
    year: "",
    gender: "",
    role: [""],
    social_links: {
      linkedin: "",
      github: "",
      instagram: "",
    },
  });

  const [errors, setErrors] = useState<newErrorsProps>({});

  const branches = ["CSE", "IT", "EC", "MECH", "CIVIL", "EE", "AI", "CSBS", 'IT-IOT'];
  const years = ["1", "2", "3", "4"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("social_links.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [key]: value,
        },
      }));
      setErrors((prev) => ({
        ...prev,
        [`social_links.${key}`]: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: newErrorsProps = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.enrollment.trim()) newErrors.enrollment = "Enrollment number is required";
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add effect to pre-fill email if available
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email || ""
      }));
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user?.id) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if user already exists in the database
      const exists = await checkUserExists(user.id);
      
      // Create or update user profile
      const { error } = await createUserProfile(user.id, {
        email: formData.email,
        name: formData.name,
        enrollment_number: formData.enrollment,
        branch: formData.branch,
        year: formData.year,
        gender: formData.gender,
        role: ["user"],
        social_links: formData.social_links,
      });
      
      if (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile details. Please try again.");
        return;
      }
      
      alert("Profile details saved successfully!");
      navigate('/profile');
    } catch (error) {
      console.error("Error in profile submission:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Full Name *</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border px-3 py-2 rounded ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="e.g., Harsh Rajpal"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border px-3 py-2 rounded ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="abhayphadoriya@mitsgwl.ac.in"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Enrollment */}
          <div>
            <label htmlFor="enrollment" className="block text-sm font-medium">Enrollment Number *</label>
            <input
              id="enrollment"
              name="enrollment"
              value={formData.enrollment}
              onChange={handleInputChange}
              className={`w-full border px-3 py-2 rounded ${errors.enrollment ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="e.g., 0901EC231001"
            />
            {errors.enrollment && <p className="text-red-500 text-sm">{errors.enrollment}</p>}
          </div>

          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium">Branch *</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleSelectChange}
              className={`w-full border px-3 py-2 rounded ${errors.branch ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium">Year *</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleSelectChange}
              className={`w-full border px-3 py-2 rounded ${errors.year ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{`${y} Year`}</option>
              ))}
            </select>
            {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              className={`w-full border px-3 py-2 rounded ${errors.gender ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>

            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Social Links */}
          <div className="space-y-2 pt-2">
            {(["linkedin", "github", "instagram"] as Array<keyof typeof formData.social_links>).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium capitalize">{key} URL</label>
                <input
                  id={key}
                  name={`social_links.${key}`}
                  value={formData.social_links[key]}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded border-gray-300"
                  placeholder={`https://${key}.com/username`}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded font-medium flex items-center justify-center gap-2 cursor-pointer`}
          >
            {isSubmitting ? 'Saving...' : (
              <>
                <Save size={18} />
                Save Details
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
