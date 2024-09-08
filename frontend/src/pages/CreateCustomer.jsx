import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Create } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { TextArea } from "../components/ui/TextArea";
import { Select } from "../components/ui/Select";

function CreateCustomer() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.state ||
      !formData.country
    ) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      const res = await fetch("/api/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate("/dashboard?tab=view-customers");
      }
    } catch (error) {
      setPublishError("Something went wrong last", error);
    }
  };
  return (
    <div className='py-12 w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center items-center'>
      {/* Spot Light */}
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20 z-10'
        fill={theme === "dark" ? "white" : "#13C6F7"}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      {/* Sign Up Form */}
      <div className='max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#abb1bb] dark:bg-[#1a232f] '>
        <div className='flex justify-center'>
          <TypewriterEffectSmooth words={Create} />
        </div>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          Create a customer to access our dynamic features
        </p>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
        <form className='mt-4' onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor='name'>Customer Name</Label>
            <Input
              id='name'
              placeholder='Enter Customer Name'
              type='text'
              onChange={handleChange}
            />
          </LabelInputContainer>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='Enter Customer Email'
                type='text'
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                placeholder='Enter Phone Number'
                type='text'
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='address'>Address</Label>
            <TextArea
              id='address'
              placeholder='Enter Address here...'
              type='text'
              rows='3'
              onChange={handleChange}
            />
          </LabelInputContainer>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='state'>State</Label>
              <Select id='state' type='text' onChange={handleChange}>
                <option value=''>Select State</option>
                <option value='Gujarat'>Gujarat</option>
                <option value='Maharashtra'>Maharashtra</option>
                <option value='Odisha'>Odisha</option>
                <option value='Rajasthan'>Rajasthan</option>
                <option value='Uttar Pradesh'>Uttar Pradesh</option>
                <option value='Delhi'>Delhi</option>
                <option value='Karnataka'>Karnataka</option>
                <option value='Tamilnadu'>Tamilnadu</option>
                <option value='Kerala'>Kerala</option>
                <option value='West Bengal'>West Bengal</option>
                <option value='Haryana'>Haryana</option>
                <option value='Madhya Pradesh'>Madhya Pradesh</option>
                <option value='Punjab'>Punjab</option>
                <option value='Jharkhand'>Jharkhand</option>
                <option value='Bihar'>Bihar</option>
                <option value='Chhattisgarh'>Chhattisgarh</option>
                <option value='Other'>Other</option>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='country'>Country</Label>
              <Select id='country' type='text' onChange={handleChange}>
                <option value=''>Select Country</option>
                <option value='India'>India</option>
                <option value='USA'>USA</option>
                <option value='UK'>UK</option>
                <option value='Australia'>Australia</option>
                <option value='Canada'>Canada</option>
                <option value='Japan'>Japan</option>
                <option value='China'>China</option>
                <option value='Other'>Other</option>
              </Select>
            </LabelInputContainer>
          </div>

          {publishError && (
            <Alert className='my-5' color='failure'>
              {publishError}
            </Alert>
          )}
          <Button
            borderRadius='8px'
            className='bg-[#ff5555] dark:bg-blue-400 hover:dark:bg-[#ff5555]  text-white  border-neutral-200 dark:border-slate-800 w-full text-md font-semibold h-12 rounded-[8px] hover:bg-blue-400'
            type='submit'
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              "Add Customer"
            )}

            <BottomGradient />
          </Button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default CreateCustomer;
