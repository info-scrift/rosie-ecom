-- Insert medical products with image URLs
INSERT INTO products (name, category, price, image_url, description, symptoms, features, in_stock) VALUES
(
  'Digital Thermometer Pro',
  'Temperature Monitoring',
  29.99,
  '/placeholder.svg?height=300&width=300&text=Digital+Thermometer+Pro',
  'Professional-grade digital thermometer with fast 10-second readings and fever alert system.',
  ARRAY['fever', 'high temperature', 'body heat', 'temperature check', 'flu', 'cold'],
  ARRAY['Fast 10-second reading', 'Fever alert', 'Memory recall', 'Waterproof tip'],
  true
),
(
  'Blood Pressure Monitor',
  'Cardiovascular Health',
  89.99,
  '/placeholder.svg?height=300&width=300&text=Blood+Pressure+Monitor',
  'Automatic upper arm blood pressure monitor with large display and irregular heartbeat detection.',
  ARRAY['high blood pressure', 'hypertension', 'chest pain', 'dizziness', 'headache', 'heart palpitations'],
  ARRAY['Large LCD display', 'Irregular heartbeat detection', '90 memory storage', 'Easy one-touch operation'],
  true
),
(
  'Pulse Oximeter',
  'Respiratory Health',
  39.99,
  '/placeholder.svg?height=300&width=300&text=Pulse+Oximeter',
  'Fingertip pulse oximeter for measuring blood oxygen saturation and pulse rate.',
  ARRAY['shortness of breath', 'breathing difficulty', 'low oxygen', 'respiratory issues', 'chest tightness', 'fatigue'],
  ARRAY['OLED display', 'Low battery indicator', 'Auto power off', 'Lanyard included'],
  true
),
(
  'Heating Pad Therapy',
  'Pain Relief',
  45.99,
  '/placeholder.svg?height=300&width=300&text=Heating+Pad+Therapy',
  'Electric heating pad with multiple heat settings for muscle pain and joint relief.',
  ARRAY['muscle pain', 'joint pain', 'back pain', 'arthritis', 'stiffness', 'muscle cramps', 'soreness'],
  ARRAY['6 heat settings', 'Auto shut-off', 'Washable cover', 'Large 12x15 inch size'],
  true
),
(
  'Compression Socks',
  'Circulation Support',
  24.99,
  '/placeholder.svg?height=300&width=300&text=Compression+Socks',
  'Graduated compression socks for improved circulation and reduced swelling.',
  ARRAY['swollen legs', 'leg pain', 'varicose veins', 'poor circulation', 'leg fatigue', 'edema'],
  ARRAY['15-20 mmHg compression', 'Moisture-wicking fabric', 'Reinforced heel and toe', 'Available in multiple sizes'],
  true
),
(
  'Nebulizer Machine',
  'Respiratory Therapy',
  79.99,
  '/placeholder.svg?height=300&width=300&text=Nebulizer+Machine',
  'Compact nebulizer for delivering medication directly to the lungs for respiratory conditions.',
  ARRAY['asthma', 'breathing problems', 'wheezing', 'cough', 'respiratory infection', 'COPD'],
  ARRAY['Quiet operation', 'Fast nebulization', 'Easy to clean', 'Includes masks and tubing'],
  true
),
(
  'Ice Pack Therapy Set',
  'Injury Care',
  19.99,
  '/placeholder.svg?height=300&width=300&text=Ice+Pack+Therapy',
  'Reusable gel ice packs with wrap for treating injuries and reducing inflammation.',
  ARRAY['swelling', 'bruising', 'sprains', 'injury', 'inflammation', 'sports injury', 'acute pain'],
  ARRAY['Reusable gel packs', 'Flexible when frozen', 'Velcro wrap included', 'Set of 2 packs'],
  true
),
(
  'Blood Glucose Monitor Kit',
  'Diabetes Care',
  49.99,
  '/placeholder.svg?height=300&width=300&text=Glucose+Monitor',
  'Complete blood glucose monitoring system for diabetes management.',
  ARRAY['diabetes', 'high blood sugar', 'frequent urination', 'excessive thirst', 'fatigue', 'blurred vision'],
  ARRAY['No coding required', 'Large display', '500 test memory', 'Includes lancets and test strips'],
  true
),
(
  'First Aid Kit Complete',
  'Emergency Care',
  34.99,
  '/placeholder.svg?height=300&width=300&text=First+Aid+Kit',
  'Comprehensive first aid kit with essential medical supplies for home and travel.',
  ARRAY['cuts', 'scrapes', 'burns', 'wounds', 'emergency', 'accidents', 'minor injuries'],
  ARRAY['120+ pieces', 'Waterproof case', 'Emergency guide included', 'Compact and portable'],
  true
),
(
  'Orthopedic Pillow',
  'Sleep Support',
  59.99,
  '/placeholder.svg?height=300&width=300&text=Orthopedic+Pillow',
  'Memory foam orthopedic pillow designed to support proper neck and spine alignment.',
  ARRAY['neck pain', 'back pain', 'poor sleep', 'stiff neck', 'headaches', 'spine issues'],
  ARRAY['Memory foam construction', 'Ergonomic design', 'Hypoallergenic cover', 'Standard and king sizes'],
  true
);
