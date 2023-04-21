/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "booklight";

export interface BooksRequest {
  query: string;
}

export interface BooksResponse {
  books: Book[];
}

export interface Book {
  title: string;
  url: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  authors: string[];
  score: number;
}

function createBaseBooksRequest(): BooksRequest {
  return { query: "" };
}

export const BooksRequest = {
  encode(message: BooksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BooksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.query = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BooksRequest {
    return { query: isSet(object.query) ? String(object.query) : "" };
  },

  toJSON(message: BooksRequest): unknown {
    const obj: any = {};
    message.query !== undefined && (obj.query = message.query);
    return obj;
  },

  create<I extends Exact<DeepPartial<BooksRequest>, I>>(base?: I): BooksRequest {
    return BooksRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BooksRequest>, I>>(object: I): BooksRequest {
    const message = createBaseBooksRequest();
    message.query = object.query ?? "";
    return message;
  },
};

function createBaseBooksResponse(): BooksResponse {
  return { books: [] };
}

export const BooksResponse = {
  encode(message: BooksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.books) {
      Book.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BooksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.books.push(Book.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BooksResponse {
    return { books: Array.isArray(object?.books) ? object.books.map((e: any) => Book.fromJSON(e)) : [] };
  },

  toJSON(message: BooksResponse): unknown {
    const obj: any = {};
    if (message.books) {
      obj.books = message.books.map((e) => e ? Book.toJSON(e) : undefined);
    } else {
      obj.books = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BooksResponse>, I>>(base?: I): BooksResponse {
    return BooksResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BooksResponse>, I>>(object: I): BooksResponse {
    const message = createBaseBooksResponse();
    message.books = object.books?.map((e) => Book.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBook(): Book {
  return { title: "", url: "", imageUrl: "", rating: 0, reviews: 0, authors: [], score: 0 };
}

export const Book = {
  encode(message: Book, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.imageUrl !== "") {
      writer.uint32(26).string(message.imageUrl);
    }
    if (message.rating !== 0) {
      writer.uint32(37).float(message.rating);
    }
    if (message.reviews !== 0) {
      writer.uint32(40).int32(message.reviews);
    }
    for (const v of message.authors) {
      writer.uint32(50).string(v!);
    }
    if (message.score !== 0) {
      writer.uint32(61).float(message.score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Book {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.imageUrl = reader.string();
          continue;
        case 4:
          if (tag != 37) {
            break;
          }

          message.rating = reader.float();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.reviews = reader.int32();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.authors.push(reader.string());
          continue;
        case 7:
          if (tag != 61) {
            break;
          }

          message.score = reader.float();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Book {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      url: isSet(object.url) ? String(object.url) : "",
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : "",
      rating: isSet(object.rating) ? Number(object.rating) : 0,
      reviews: isSet(object.reviews) ? Number(object.reviews) : 0,
      authors: Array.isArray(object?.authors) ? object.authors.map((e: any) => String(e)) : [],
      score: isSet(object.score) ? Number(object.score) : 0,
    };
  },

  toJSON(message: Book): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.url !== undefined && (obj.url = message.url);
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.rating !== undefined && (obj.rating = message.rating);
    message.reviews !== undefined && (obj.reviews = Math.round(message.reviews));
    if (message.authors) {
      obj.authors = message.authors.map((e) => e);
    } else {
      obj.authors = [];
    }
    message.score !== undefined && (obj.score = message.score);
    return obj;
  },

  create<I extends Exact<DeepPartial<Book>, I>>(base?: I): Book {
    return Book.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Book>, I>>(object: I): Book {
    const message = createBaseBook();
    message.title = object.title ?? "";
    message.url = object.url ?? "";
    message.imageUrl = object.imageUrl ?? "";
    message.rating = object.rating ?? 0;
    message.reviews = object.reviews ?? 0;
    message.authors = object.authors?.map((e) => e) || [];
    message.score = object.score ?? 0;
    return message;
  },
};

export type BooksService = typeof BooksService;
export const BooksService = {
  get: {
    path: "/booklight.Books/Get",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BooksRequest) => Buffer.from(BooksRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BooksRequest.decode(value),
    responseSerialize: (value: BooksResponse) => Buffer.from(BooksResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => BooksResponse.decode(value),
  },
} as const;

export interface BooksServer extends UntypedServiceImplementation {
  get: handleUnaryCall<BooksRequest, BooksResponse>;
}

export interface BooksClient extends Client {
  get(request: BooksRequest, callback: (error: ServiceError | null, response: BooksResponse) => void): ClientUnaryCall;
  get(
    request: BooksRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: BooksResponse) => void,
  ): ClientUnaryCall;
  get(
    request: BooksRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: BooksResponse) => void,
  ): ClientUnaryCall;
}

export const BooksClient = makeGenericClientConstructor(BooksService, "booklight.Books") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): BooksClient;
  service: typeof BooksService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
