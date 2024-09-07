import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreaePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const {createProduct} = useProductStore();
  const handleAddProduct = async () => {
    const {sucess, message} = await createProduct(newProduct);
    if(!sucess) {
        toast({
            title: "Error",
            description: message,
            status: "error",
            isClosable: true
        })
    } else {
        toast({
            title: "Sucess",
            description: message,
            status: "success",
            isClosable: true
        })
    }
    setNewProduct({name: "", price: "", image: ""})
  }
  return (
    <Container>
      <VStack spacing={4}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.600")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder="price"
              name="name"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder="Image url"
              name="name"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
          </VStack>
          <Button colorScheme="blue" onClick={handleAddProduct} mt={4} w={"full"}>Add Product</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreaePage;
