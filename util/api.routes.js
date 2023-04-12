import express from "express";
import prisma from "./prisma.setup.js";

const router = express.Router();

// GET: all
router.get("/", async (req, res) => {
  const eventList = await prisma.event.findMany();
  res.status(200).json(eventList);
});

// GET: by party
router.get("/party/:pname", async (req, res) => {
  const findParty = await prisma.event.findMany({
    where: {
      party_name: req.params.pname,
    },
  });

  if (!findParty) {
    return res.status(404).json({ message: "Party not found" });
  }

  res.status(200).json(findParty);
});

// POST: create new
router.post("/new", async (req, res) => {
  const { name, party_name, when } = req.body;
  const newEvent = await prisma.event.create({
    data: {
      name,
      party_name,
      when,
    },
  });
  res
    .status(201)
    .json({ message: "Event is created on the DB", data: newEvent });
});

// UPDATE: update
router.patch("/upd/:id", async (req, res) => {
  const findEvent = await prisma.event.findUnique({
    where: { id: req.params.id },
  });

  if (!findEvent) {
    return res.status(404).json({ message: "Event not found" });
  }

  const updateEvent = await prisma.event.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      party_name: req.body.party_name,
      when: req.body.when,
    },
  });

  res
    .status(201)
    .json({ message: "Event has been updated", data: updateEvent });
});

// DELETE: remove
router.delete("/del/:id", async (req, res) => {
  const findEvent = await prisma.event.findUnique({
    where: { id: req.params.id },
  });

  if (!findEvent) {
    return res.status(404).json({ message: "Not Found" });
  }

  await prisma.event
    .delete({ where: { id: req.params.id } })
    .then((item) => {
      res.status(200).json({ message: `${item.name} was removed` });
    })
    .catch((e) =>
      res.status(500).json({ message: "Something went wrong", error: e })
    );
});

export default router;
