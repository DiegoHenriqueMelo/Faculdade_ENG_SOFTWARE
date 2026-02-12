import express from "express";
import * as Routes from "../routes/routes.js";
import { Request, Response } from "express";
import * as ControllerCandidato from "../controller/candidate/controllerCandidato.js";
import * as ControllerEmpresa from "../controller/empresa/controllerEmpresa.js";
import * as ControllerVaga from "../controller/vaga/controllerVaga.js";
import * as ControllerAdmin from "../controller/admin/controllerAdmin.js";
import cors from "cors";

export let startServ = (PORT: number) => {
  const APP = express();
  APP.use(express.json());
  APP.use(cors());

  APP.listen(PORT, () => {
    console.log(`✔️ Servidor iniciado e escutando na porta ${PORT}`);
  });

  // Rotas POST

  APP.post(Routes.postCandidato, async (req: Request, res: Response) => {
    try {
      const candidato = req.body;

      let [status, message] = await ControllerCandidato.postCandidato(
        candidato
      );

      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.post(Routes.postEmpresa, async (req: Request, res: Response) => {
    try {
      const empresa = req.body;

      let [status, message] = await ControllerEmpresa.postEmpresa(empresa);

      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.post(Routes.postVaga, async (req: Request, res: Response) => {
    try {
      const vaga = req.body;
      const { id } = req.params;

      let [status, message] = await ControllerVaga.postVaga(vaga, Number(id));

      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.post(Routes.postAcessibilidade, async (req: Request, res: Response) => {
    try {
      const acessibilidade = req.body;

      let [status, message] = await ControllerAdmin.postAcessibilidade(
        acessibilidade
      );

      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.post(Routes.postBarreira, async (req: Request, res: Response) => {
    try {
      const barreira = req.body;

      let [status, message] = await ControllerAdmin.postBarreira(
        barreira
      );

      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  APP.post(Routes.postSubtipo, async (req: Request, res: Response) => {
    try {
      const subtipo = req.body;

      let [status, message] = await ControllerAdmin.postSubtipo(
        subtipo
      );

      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  // Rotas GET

  APP.get(Routes.getCanditado, async (req: Request, res: Response) => {
    try {
      let [status, data] = await ControllerCandidato.getCandidatos();
      res.status(status).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.get(Routes.getEmpresa, async (req: Request, res: Response) => {
    try {
      let [status, data] = await ControllerEmpresa.getEmpresas();
      res.status(status).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.get(Routes.getVagas, async (req: Request, res: Response) => {
    try {
      let [status, data] = await ControllerVaga.getVagas();
      res.status(status).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  // Rotas DELETE

  APP.delete(Routes.deleteCanditado, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let [status, message] = await ControllerCandidato.deleteCandidato(Number(id));
      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.delete(Routes.deleteEmpresa, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let [status, message] = await ControllerEmpresa.deleteEmpresa(Number(id));
      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.delete(Routes.deleteVaga, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let [status, message] = await ControllerVaga.deleteVaga(Number(id));
      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  // Rotas UPDATE

  APP.put(Routes.updateCanditado, async (req: Request, res: Response) => {
    try {
      const candidato = req.body;
      const { id } = req.params;
      let [status, message] = await ControllerCandidato.updateCandidato(
        candidato,
        Number(id)
      );
      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.put(Routes.updateEmpresa, async (req: Request, res: Response) => {
    try {
      const empresa = req.body;
      const { id } = req.params;
      let [status, message] = await ControllerEmpresa.updateEmpresa(
        empresa,
        Number(id)
      );
      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  APP.put(Routes.updateVAga, async (req: Request, res: Response) => {
    try {
      const vaga = req.body;
      const { id } = req.params;
      let [status, message] = await ControllerVaga.updateVaga(
        vaga,
        Number(id)
      );
      res.status(status).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
