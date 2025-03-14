-- SELECT "ServiceDoctor"."id", "Doctor"."firstName", "Doctor"."specialization" FROM public."ServiceDoctor" INNER JOIN public."Doctor" ON "ServiceDoctor"."doctorId" = "Doctor"."id"

-- SELECT s."serviceName", sd.cost, d."firstName", d."lastName"
-- FROM public."Service" s
-- JOIN public."ServiceDoctor" sd ON s.id = sd."serviceId"
-- JOIN public."Doctor" d ON sd."doctorId" = d.id

-- Enter entries in slots table
INSERT INTO public."Slot" (id, "startTime", "status", "doctorId")
VALUES
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a7a', '2023-04-01 10:00:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a7b', '2023-04-02 11:30:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a7c', '2023-04-03 14:15:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a71', '2023-04-04 09:45:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a72', '2023-04-05 16:20:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a73', '2023-04-06 13:00:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a74', '2023-04-07 11:10:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a75', '2023-04-08 14:40:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a76', '2023-04-09 10:30:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384'),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a77', '2023-04-10 15:50:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384');