import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

// Consultas GraphQL
const GET_INTERESTS_QUERY = gql`
  query GetInterests($search: String) {
    interests(search: $search) {
      id
      name
      description
    }
  }
`;

const GET_INTEREST_BY_ID_QUERY = gql`
  query GetInterestById($idInterest: Int!) {
    interestById(idInterest: $idInterest) {
      id
      name
      description
    }
  }
`;

// Mutaciones GraphQL
const CREATE_INTEREST_MUTATION = gql`
  mutation CreateInterest($name: String!, $description: String!) {
    createInterest(name: $name, description: $description) {
      idInterest
      name
      description
      postedBy {
        id
        username
      }
    }
  }
`;

const DELETE_INTEREST_MUTATION = gql`
  mutation DeleteInterest($idInterest: Int!) {
    deleteInterest(idInterest: $idInterest) {
      idInterest
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphqlInterestService {
  constructor(private apollo: Apollo) {}

  private createAuthHeader(token: string) {
    return {
      headers: new HttpHeaders().set('Authorization', `JWT ${token}`),
    };
  }

  /**
   * Obtener todas las intereses del usuario, con un filtro opcional.
   * @param token Token de autenticación JWT.
   * @param search Filtro opcional para buscar intereses por nombre.
   */
  getInterests(token: string, search?: string) {
    return this.apollo.query({
      query: GET_INTERESTS_QUERY,
      variables: { search },
      context: this.createAuthHeader(token),
    });
  }

  /**
   * Obtener un interés específico por ID.
   * @param idInterest ID del interés.
   * @param token Token de autenticación JWT.
   */
  getInterestById(idInterest: number, token: string) {
    return this.apollo.query({
      query: GET_INTEREST_BY_ID_QUERY,
      variables: { idInterest },
      context: this.createAuthHeader(token),
    });
  }

  /**
   * Crear un nuevo interés.
   * @param interest Datos del nuevo interés.
   * @param token Token de autenticación JWT.
   */
  createInterest(interest: { name: string; description: string }, token: string) {
    return this.apollo.mutate({
      mutation: CREATE_INTEREST_MUTATION,
      variables: interest,
      context: this.createAuthHeader(token),
    });
  }

  /**
   * Eliminar un interés por ID.
   * @param idInterest ID del interés a eliminar.
   * @param token Token de autenticación JWT.
   */
  deleteInterest(idInterest: number, token: string) {
    return this.apollo.mutate({
      mutation: DELETE_INTEREST_MUTATION,
      variables: { idInterest },
      context: this.createAuthHeader(token),
    });
  }
}
