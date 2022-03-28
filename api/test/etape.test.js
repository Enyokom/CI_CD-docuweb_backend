/* eslint-disable no-unused-expressions */
'use strict';

const test = require('unit.js');
const { Etape } = require('./config'); /* chercher le model etape dans confid*/
const { createEtape } = require('./helpers');

describe('Etapes', function() {
  before(function(done) {
    connectMongoDB(done);
  });

  after(function(done) {
    closeMongoDB(done);
  });
  beforeEach(function(done) { /* entre chaque test suppresion des données test avants*/
    Etape
      .deleteMany({})
      .then(() => done())
      .catch(done);
  });

  it('should create an etape', async function() {
    const res = await test
      .httpAgent(apiUrl)
      .post('/etapes') /* route etape par le*/
      .send({ name: 'etape de test', descriptif: 'le contenu etape test' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    let etape = res.body; /* resultat de la creation*/
    etape.should.be.an.Object();/* l'objet obtenu doit etre un objet etape*/
    etape.id.should.be.ok; /* etape doit avoir un id*/
    // Mongo ID should be 24 chars
    etape.id.length.should.be.equal(24);/* longueur de l'id doit etre 24 car dans mg c'est 24*/
    etape.name.should.equal('etape de test');
    etape.descriptif.should.be.equal('le contenu etape test');

    etape.createdAt.should.be.a.String();

    /* test Junit*/

    test
      .string(etape.createdAt)
      .bool(etape.createdAt <= Date.now)

      .string(etape.updatedAt)
      .isEqualTo(etape.createdAt);
  });

  it('should update an etape', async function() {
    // creer un objet dans la base un objet par defaut qui vient de helpers/index.js
    let createdEtape = await createEtape();
    // lancement update de la commande en Junit
    const res = await test
      .httpAgent(apiUrl)
      .put('/etapes/' + createdEtape.id)
      .send({ name: 'mon titre modifié', descriptif: 'le contenu modifié' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    // creeation d'une variable qui va contenir le corps de la réponse
    let etape = res.body;

    etape.should.be.an.Object();
    // Mongo ID should be 24 chars: la longueur de l ID
    etape.id.length.should.be.equal(24);
    etape.name.should.equal('mon titre modifié');
    etape.descriptif.should.equal('le contenu modifié');
    test.assert(etape.createdAt < etape.updatedAt);
    test.assert(createdEtape.updatedAt !== etape.updatedAt);
  });

  it('should delete an etape', async function() {
    let createdEtape = await createEtape();

    const res = await test
      .httpAgent(apiUrl)
      .delete('/etapes/' + createdEtape.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    // place dans le variable le corps de la réponse
    let etape = res.body;

    etape.should.be.an.Object();
    // Mongo ID should be 24 chars
    etape.id.length.should.be.equal(24);
    etape.name.should.equal(createdEtape.name);
    etape.descriptif.should.equal(createdEtape.descriptif);
    // creation de la variable foundEtape qui va ramener l'objet avec l'Id deja effacé
    let foundEtape = await Etape.findById(createdEtape.id);

    test.assert(!foundEtape);
  });

  it('should list all etapes', async function() {
    let createdEtape = await createEtape(); /*  objet crée par defaut*/
    let res = await test
      .httpAgent(apiUrl)
      .get('/etapes')
      .expect('Content-Type', /json/)
      .expect(200);

    // With Unit.js
    /* test
      .array(res.body)
      .hasLength(1)
  .object(res.body[0])
      .hasProperty('id', createdEtape.id)
      .hasProperty('title', createdEtape.title)
      .hasProperty('content', createdEtape.content);*/

    // With Should.js

    let etapeTest = res.body;
    etapeTest.length.should.be.equal(1);
    // res.body.length.should.be.equal(1);

    let etape = res.body[0]; // l'objet recupere pour etre dans la variable etape qui est le premier objet
    etape.hasOwnProperty('id').should.be.equal(true); // est ce que l'objet a une propreté qui s'appelle id
    etape.hasOwnProperty('name').should.be.equal(true);
    etape.hasOwnProperty('descriptif').should.be.equal(true);
    etape.id.length.should.be.equal(24); // longueur
    etape.name.should.be.a.String(); // type
    etape.descriptif.should.be.equal('Maintenance Aero');// la valeur
    etape.id.should.equal(createdEtape.id);
    etape.name.should.equal(createdEtape.name);
    etape.descriptif.should.equal(createdEtape.descriptif);
  });

  it('should show one etape', async function() {
    let createdEtape, etape, res; // création de 3 variables

    createdEtape = await createEtape(); // Objet CreatedEtape est l'objet par defaut cree dans la base
    createdEtape.id.should.be.String();
    // Mongo ID should be 24 chars
    createdEtape.id.length.should.be.equal(24);

    res = await test // le resultat de la requete Junit (test)
      .httpAgent(apiUrl)
      .get('/etapes/' + createdEtape.id)
      .expect('Content-Type', /json/)
      .expect(200);

    etape = res.body; // mettre le corps de la variable res dans l'etape
    etape.id.should.be.equal(createdEtape.id);
    etape.name.should.be.equal(createdEtape.name);
    etape.descriptif.should.be.equal(createdEtape.descriptif);
  });
});
