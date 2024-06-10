import React from 'react';
import { storage, firebase } from '../services/firebase';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Form, Input, Upload, Rate, Image, InputNumber } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Book {
  _id: string;
  bookname: string;
  author: string;
  description: string;
  rating: number;
  image: string;
  price: number;
}

type Props = {};

function EditBook({}: Props) {
  const [imageUrl, setImageUrl] = React.useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [data, setData] = React.useState<Book | null>(null);
  const { id } = useParams();

  // use effect to get single book details and store on data use state
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getbooks/${id}`)
      .then((response) => {
        setData(response.data);
        // Set form fields values after data is fetched
        form.setFieldsValue({
          bookname: response.data.bookname,
          author: response.data.author,
          description: response.data.description,
          rating: response.data.rating,
          price: response.data.price,
        });
        console.log('initial values loaded from api');
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, [id, form]);

  // upload firebase

  const customUploadValidator = async (file: File) => {
    console.log('File name:', file.name);
    console.log('File type:', file.type);
    console.log('File size (in bytes):', file.size);

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      message.error('File size exceeds the allowed limit (5 MB)');
      form.resetFields(['bookImage']);
      return false;
    }

    // check type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      message.error('You can only upload JPG and PNG files!');
      form.resetFields(['bookImage']);
      return false;
    }

    // Upload the file to Firebase Storage
    const storageRef = storage.ref();
    const fileName = `${Date.now()}-${file.name}`;
    try {
      const imageRef = storageRef.child(`images/${fileName}`);
      const snapshot = await imageRef.put(file);

      setImageUrl(await snapshot.ref.getDownloadURL());

      console.log('Download URL:', imageUrl);

      message.info('Image uploaded successfully');

      return false;
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Error uploading image');
      form.resetFields(['bookImage']);

      return false;
    }
  };
  const handlesubmit = (values: any) => {
    const postData = {
      bookname: values.bookname,
      author: values.author,
      description: values.description,
      rating: values.rating,
      image: imageUrl ? imageUrl : undefined,
      price: values.price,
    };
    //axios post
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/updatebook/${id}`, postData)
      .then((response) => {
        console.log('POST request success:', response.data);
        message.success('Book updated');
        navigate('/admin/books');
      })
      .catch((error) => {
        console.error('POST request error:', error);
        message.error('Some field is missing or database not working');
      });
  };

  return (
    <div className='flex justify-center w-full'>
      <div className='bg-white my-4 shadow-md px-5 pt-1 font-poppins rounded-lg flex justify-between w-7/12 '>
        <Form
          form={form}
          className='w-full'
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          onFinish={handlesubmit}>
          <p className='font-poppins font-semibold text-xl text-center'>Edit Book</p>
          <Form.Item label='Book Title' name='bookname' rules={[{ required: true, message: 'Please enter a book title' }]}>
            <Input />
          </Form.Item>

          <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Please enter a book price' }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Author' name='author' rules={[{ required: true, message: 'Please enter an author' }]}>
            <Input />
          </Form.Item>

          <Form.Item label='Description' name='description' rules={[{ required: true, message: 'Please enter a description' }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label='Rating' name='rating' rules={[{ required: true, message: 'Please choose a rating' }]}>
            <Rate />
          </Form.Item>

          <Form.Item
            label='Book Image'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            name='bookImage'
            // rules={[{ required: true, message: "Please Add an image" }]}
          >
            <Upload listType='picture-card' maxCount={1} accept='.jpg, .png' beforeUpload={customUploadValidator}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label='Current Image'>
            <Image width={100} height={100} src={data ? data.image : ''} />
          </Form.Item>

          <Form.Item label='Submit'>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditBook;
