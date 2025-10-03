describe('Create Project Flow', () => {
  it('should allow a user to create a new project and see it on the list', () => {
    const projectName = `Yeni Test Projesi ${Date.now()}`
    const projectDesc =
      'Bu proje Cypress tarafından otomatik olarak oluşturulmuştur.'
    const projectLead = 'Test Mühendisi'

    cy.viewport(1280, 720)

    // 1. Adım
    cy.visit('http://localhost:3000')

    // 2. Adım
    cy.contains('a', 'Projeler').click()

    // 3. Adım
    cy.contains('button', 'Yeni Proje Ekle').click()

    cy.url().should('include', '/projects/new')

    // 4. Adım
    cy.get('input[id=name]').type(projectName)
    cy.get('input[id=description]').type(projectDesc)
    cy.get('input[id=lead]').type(projectLead)

    // 5. Adım
    cy.contains('button', 'Proje Oluştur').click()

    // 6. Adım
    cy.url().should('include', '/projects')

    cy.contains('h2', projectName).scrollIntoView().should('be.visible')
  })
})
