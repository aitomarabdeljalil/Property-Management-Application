import express from "express";
import Tenant from "../models/Tenant.js";
const router = express.Router();

//Endpoints

//List of all tenants
router.get("/", async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    return res.status(200).json(tenants);
  } catch (error) {
    return res.status(400).json({ error: "Failed to get tenants" });
  }
});

//Get a tenant
router.get("/:id", async (req, res) => {
  try {
    const tenantId = parseInt(req.params.id);
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });
    return res.status(200).json(tenant);
  } catch (error) {
    return res.status(400).json({ error: "Failed to get tenant"});
  }
});

//Add a tenant
router.post("/", async (req, res) => {
  try {
    const newTenant = await Tenant.create(req.body);
    res.status(201).json(newTenant);
  } catch (error) {
    return res.status(400).json({ error: "Failed to add tenant" });
  }
});

//Update a tenant
router.put("/:id", async (req, res) => {
  const tenantId = parseInt(req.params.id);
  const updatedTenant = req.body;
  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });
    await Tenant.update(
      {
        name: updatedTenant.name,
        contact: updatedTenant.contact,
        sectionOccupied: updatedTenant.sectionOccupied,
        propertyId: updatedTenant.propertyId,
      },
      {
        where: {
          id: tenantId,
        },
      }
    );
    res.status(204).json(updatedTenant);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Failed to modify tenant or the tenant doesn't exist" });
  }
});

//Delete a tenant
router.delete("/:id", async (req, res) => {
  const tenantId = parseInt(req.params.id);
  try {
    await Tenant.destroy({
      where: { id: tenantId },
    });
    res.status(201).json({});
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Failed to delete tenant or the tenant doesn't exist" });
  }
});

export default router;
