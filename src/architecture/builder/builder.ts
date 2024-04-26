/**
 * The Builder interface specifies methods for creating the different parts of
 * the velo objects.
 */
interface Builder {
  produceGuidon(): void;
  produceCadre(): void;
  produceRoue(): void;
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class Decathlon implements Builder {
  private velo: Velo;

  /**
   * A fresh builder instance should contain a blank velo object, which is
   * used in further assembly.
   */
  constructor(parts: string[]) {
    this.build(parts);
  }

  public build(parts: string[]): void {
    this.velo: Velo = {
      parts: [
        this.produceCadre(partS[0]),
        this.produceGuidon(parts[1])
      ]
    };
  }

  /**
   * All production steps work with the same velo instance.
   */
  public produceGuidon(): void {
    this.velo.parts.push('PartA1');
  }

  public produceCadre(): void {
    this.velo.parts.push('PartB1');
  }

  public produceRoue(): void {
    this.velo.parts.push('PartC1');
  }

  /**
   * Concrete Builders are supposed to provide their own methods for
   * retrieving results. That's because various types of builders may create
   * entirely different products that don't follow the same interface.
   * Therefore, such methods cannot be declared in the base Builder interface
   * (at least in a statically typed programming language).
   *
   * Usually, after returning the end result to the client, a builder instance
   * is expected to be ready to start producing another velo. That's why
   * it's a usual practice to call the reset method at the end of the
   * `getProduct` method body. However, this behavior is not mandatory, and
   * you can make your builders wait for an explicit reset call from the
   * client code before disposing of the previous result.
   */
  public getProduct(): Velo {
    const result = this.velo;
    this.reset();
    return result;
  }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
interface Velo {
  parts: string[];
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {
  private decathlon: Builder;

  /**
   * The Director works with any builder instance that the client code passes
   * to it. This way, the client code may alter the final type of the newly
   * assembled velo.
   */
  public setBuilder(builder: Builder): void {
    this.decathlon = builder;
  }

  /**
   * The Director can construct several velo variations using the same
   * building steps.
   */
  public buildMinimalViableProduct(): void {
    this.decathlon.produceCadre();
  }

  public buildFullFeaturedProduct(): void {
    this.decathlon.produceGuidon();
    this.decathlon.produceCadre();
    this.decathlon.produceRoue();
  }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director: Director) {
  const builder = new Decathlon();
  director.setBuilder(builder);

  console.log('Standard basic velo:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured velo:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log('Custom velo:');
  builder.produceGuidon();
  builder.produceRoue();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
