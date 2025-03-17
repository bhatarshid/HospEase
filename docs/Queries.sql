-- SELECT "ServiceDoctor"."id", "Doctor"."firstName", "Doctor"."specialization" FROM public."ServiceDoctor" INNER JOIN public."Doctor" ON "ServiceDoctor"."doctorId" = "Doctor"."id"

-- SELECT s."serviceName", sd.cost, d."firstName", d."lastName"
-- FROM public."Service" s
-- JOIN public."ServiceDoctor" sd ON s.id = sd."serviceId"
-- JOIN public."Doctor" d ON sd."doctorId" = d.id

-- Enter entries in slots table
INSERT INTO public."Slot" (id, "startTime", "status", "serDocId", "bookedSlots", "createdAt", "totalSlots", "updatedAt")
VALUES
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a7a', '2025-04-01 10:00:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a7b', '2025-04-02 11:30:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a7c', '2025-04-03 14:15:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a71', '2025-04-04 09:45:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a72', '2025-04-05 16:20:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a73', '2025-04-06 13:00:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a74', '2025-04-07 11:10:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a75', '2025-04-08 14:40:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a76', '2025-04-09 10:30:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00"),
  ('5c8d6f4c-9b4b-4a80-b944-2d5f95b85a77', '2025-04-10 15:50:00', 'OPEN', 'b4328ede-e97e-4b65-afed-a2fd8cb0b384', 4, "2024-04-01 10:00:00", 10, "2024-04-01 10:00:00");