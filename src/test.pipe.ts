import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// 在 Nest.js 中，Pipe（管道）是一种用于处理输入数据的机制。它充当输入转换和验证的过滤器，
// 可以在数据进入控制器之前对其进行转换、验证和处理。

// 管道可以应用于控制器的路由处理器、自定义参数装饰器以及全局作用域。它们可以用于验证请求的有效性
// 、转换请求数据的格式或类型，以及对输入数据进行处理和清理。

// Nest.js 提供了一些内置的管道，例如：

// ValidationPipe：用于基于装饰器的类验证。它使用 class-validator 库进行数据验证，
// 并可以自动转换请求的有效载荷（payload）到指定的 DTO（数据传输对象）。

// ParseIntPipe：将路由参数转换为整数类型。

// ParseBoolPipe：将路由参数转换为布尔类型。

// ParseArrayPipe：将路由参数解析为数组类型。
// ParseUUIDPipe、
// ParseEnumPipe、
// ParseFloatPipe
// DefaultValuePipe。

// 除了使用内置管道之外，你还可以创建自定义的管道来满足特定的需求。自定义管道必须实现 PipeTransform 接口，
// 并实现 transform() 方法，该方法接收输入数据并返回转换后的数据或抛出异常。

// 使用管道的主要优点是可以在输入数据进入控制器之前对其进行验证和转换，以确保数据的有效性和一致性。
// 它可以减少在每个处理器中进行重复的验证和转换逻辑，并提供了一种统一的方式来处理输入数据。此外，
// 管道还可以用于执行一些通用的数据处理操作，如日志记录、数据清理和格式转换。

// 要在 Nest.js 中使用管道，你可以通过使用 @UsePipes() 装饰器将其应用于控制器的路由处理器、
// 自定义参数装饰器或全局作用域。你可以单独应用一个或多个管道，并可以在需要时指定特定的管道选项。

// 总结而言，管道是 Nest.js 中用于处理输入数据的机制，可以进行验证、转换和处理。
// 它们提供了一种简洁和可扩展的方式来处理请求数据，并增加了代码的可读性和可维护性。
@Injectable()
export class TestPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
