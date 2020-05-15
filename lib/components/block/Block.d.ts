import { ContainerOptions, Container } from '../../base';
export declare class BlockOptions extends ContainerOptions {
}
export declare class Block extends Container {
    constructor(options?: BlockOptions);
    create(): any;
}
